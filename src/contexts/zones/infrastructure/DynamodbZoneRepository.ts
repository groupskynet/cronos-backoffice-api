import { Service } from 'diod'
import { Zone } from '../domain/Zone'
import { ZoneRepository } from '../domain/contracts/ZoneRepository'
import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { ZoneDynamodbItem } from './dynamodb/ZoneDynamodbItem'
import { TransactWriteItem, TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { UserAdminDynamodbItem } from './dynamodb/UserAdimDynamodbItem'
import { UserRecorderDynamodbItem } from './dynamodb/UserRecorderDynamoDbItem'
import { ClubDynamodbItem } from './dynamodb/ClubDynamodbItem'

@Service()
export class DynamodbZoneRepository implements ZoneRepository {
  private readonly tableName = 'cronos_backoffice'
  constructor(private readonly connection: DynamodbConnection) {}

  async getFindbyName(name: string): Promise<Zone | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new QueryCommand({
      TableName: 'cronos_backoffice',
      IndexName: 'GSI1-Index',
      KeyConditionExpression: 'GSI2PK = :gsi2pk',
      ExpressionAttributeValues: {
        ':gsi2pk': `ZONE#${name}`
      }
    })

    const response = await client.send(command)

    if (!response.Items) return null

    const item = response.Items[0]

    return new Zone({
      id: item.id,
      currency: item.currency,
      demography: item.demography,
      user: item.user
    })
  }

  async saveOrUpdate(zone: Zone): Promise<void> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const zoneModel = new ZoneDynamodbItem(zone)

    const adminModel = new UserAdminDynamodbItem(zone.user, zone.id)

    const itemClubRecorder: TransactWriteItem[] = []

    const itemClub: TransactWriteItem[] = []

    zone.clubs.forEach((club) => {
      club.recorders.forEach((recorder) => {
        const recorderModel = new UserRecorderDynamodbItem(recorder, club.id)
        itemClubRecorder.push({
          Put: {
            TableName: this.tableName,
            Item: recorderModel.toItem(),
            ConditionExpression: 'attribute_not_exists(PK)'
          }
        })
      })

      const clubModel = new ClubDynamodbItem(club, zone.id)

      itemClub.push({
        Put: {
          TableName: this.tableName,
          Item: clubModel.toItem(),
          ConditionExpression: 'attribute_not_exists(PK)'
        }
      })
    })

    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: 'cronos_backoffice',
            Item: zoneModel.toItem(),
            ConditionExpression: 'attribute_not_exists(PK)'
          }
        },
        {
          Put: {
            TableName: 'cronos_backoffice',
            Item: adminModel.toItem(),
            ConditionExpression: 'attribute_not_exists(PK)'
          }
        },
        ...itemClub,
        ...itemClubRecorder
      ]
    })

    await client.send(command).catch((error) => {
      console.log(error)
    })
  }

  async getFindbyId(id: string): Promise<Zone | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new QueryCommand({
      TableName: 'cronos_backoffice',
      IndexName: 'GSI1-Index',
      KeyConditionExpression: 'GSI1PK = :gsi1pk AND GSI1sK = :gsi1sk',
      ExpressionAttributeValues: {
        ':gsi1pk': `ZONE#`,
        ':gsi1sk': `ZONE#${id}`
      }
    })

    const response = await client.send(command)

    if (!response.Items) return null

    const item = response.Items[0]

    return new Zone({
      id: item.id,
      currency: item.currency,
      demography: item.demography,
      user: item.user
    })
  }
}