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
            ConditionExpression: 'attribute_not_exists(PK)'
          }
        })
      })
    }

    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: this.tableName,
            Item: zoneModel.toItem(),
            ConditionExpression: 'attribute_not_exists(PK)'
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
      TableName: 'cronos_backoffice',
      Key: {
        PK: `ZONE#${id}`,
        SK: `#METADATA#`
      }
    })

    const responseZone = await client.send(commandZone)

    if (!responseZone.Item) return null

    const queryClubs = new QueryCommand({
      TableName: 'cronos_backoffice',
      IndexName: 'GSI1',
      KeyConditionExpression: 'PK = :gsi1pk and SK = :gsi1sk',
      ExpressionAttributeValues: {
        ':gsi1sk': `ZONE#${id}`,
        ':gsi1pk': `CLUB#`
      }
    })

    const responseClubs = await client.send(queryClubs)

    let clubs: Club[] = []

    if (responseClubs.Items) {
      clubs = responseClubs.Items.map(
        (item) =>
          new Club({
            id: item.Id,
            demography: new Demography({
            name: item.Demography.name,
            address: item.Demography.address,
            timeZone: item.Demography.timeZone
            })
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
