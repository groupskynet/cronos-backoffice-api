import { Service } from 'diod'
import { Zone } from '../domain/Zone'
import { ZoneRepository } from '../domain/contracts/ZoneRepository'
import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { ZoneDynamodbItem } from './dynamodb/ZoneDynamodbItem'
import { TransactWriteItem, TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { ClubDynamodbItem } from './dynamodb/ClubDynamodbItem'
import { Club } from '../domain/Club'
import { Demography } from '@contexts/shared/domain/value_objects/Demography'
import { Maybe } from '@contexts/shared/domain/Maybe'
import { Uuid } from '@contexts/shared/domain/value_objects/Uuid'
import { ZoneCurrency } from '../domain/value_objects/zone/ZoneCurrency'

@Service()
export class DynamodbZoneRepository implements ZoneRepository {
  private readonly tableName = 'cronos_backoffice'
  constructor(private readonly connection: DynamodbConnection) {}
  
  async getFindbyName(name: string): Promise<Zone | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const commandZone = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'GSI2',
      KeyConditionExpression: 'GSI2PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `ZONE#${name}`,
      }
    })

    const responseZone = await client.send(commandZone)

    if (!responseZone.Items || responseZone.Items.length === 0) return null

    const zoneItem = responseZone.Items[0]

    const zone = new Zone({
      id: zoneItem.Id,
      currency: new ZoneCurrency(zoneItem.Currency),
      balance: Number.parseFloat(zoneItem.Balance),
      demography: new Demography({
        name: zoneItem.Demography.name,
        address: zoneItem.Demography.address,
        timeZone: zoneItem.Demography.timeZone
      }),
      clubs: Maybe.none() ,
      userId: new Uuid(zoneItem.UserId)
    })

    return zone
  }

  async saveOrUpdate(zone: Zone): Promise<void> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const zoneModel = new ZoneDynamodbItem(zone)

    const itemsClub: TransactWriteItem[] = []

    if (!zone.clubs.isEmpty()) {
      zone.clubs.get().forEach((club) => {
        const clubModel = new ClubDynamodbItem(club, zone.id)

        itemsClub.push({
          Put: {
            TableName: this.tableName,
            Item: clubModel.toItem(),
          }
        })
      })
    }

    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: this.tableName,
            Item: zoneModel.toItem()
          }
        },
        ...itemsClub
      ]
    })

    await client.send(command).catch((error) => {
      console.log(error)
    })
  }

  async getFindbyId(id: string): Promise<Zone | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const commandZone = new GetCommand({
      TableName: this.tableName,
      Key: {
        PK: `ZONE#${id}`,
        SK: `#METADATA#`
      }
    })

    const responseZone = await client.send(commandZone)

    if (!responseZone.Item) return null

    const queryClubs = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `ZONE#${id}`,
        ':sk': `CLUB#`
      }
    })

    const responseClubs = await client.send(queryClubs)

     let clubs: Club[] = []

    if (responseClubs.Items && responseClubs.Items.length > 0) {
      clubs = responseClubs.Items.map(
        (item) =>
          new Club({
            id: item.Id,
            demography: new Demography({
            name: item.Demography.name,
            address: item.Demography.address,
            timeZone: item.Demography.timeZone
            }
          ),
          balance: Number.parseFloat(item.Balance),
          recorders: item.Recorders ? item.Recorders.map((x: string) => new Uuid(x)) : Maybe.none()
          })
      )
    }

    const zone = new Zone({
      id: responseZone.Item.Id,
      currency: new ZoneCurrency(responseZone.Item.Currency),
      balance: Number.parseFloat(responseZone.Item.Balance),
      demography: new Demography({
        name: responseZone.Item.Demography.name,
        address: responseZone.Item.Demography.address,
        timeZone: responseZone.Item.Demography.timeZone
      }),
      clubs: clubs ? Maybe.some(clubs) : Maybe.none(),
      userId: new Uuid(responseZone.Item.UserId)
    })

    return zone
  }
}
