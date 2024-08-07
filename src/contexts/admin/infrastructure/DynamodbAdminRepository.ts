import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { AdminDynamodbItem } from './dynamodb/AdminDynamodbItem'
import { AdminRepository } from '../domain/contracts/AdminRepository'
import { Admin } from '../domain/Admin'
import { Service } from 'diod'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { AdminId } from '@contexts/admin/domain/value_objects/AdminId'
import { AdminName } from '@contexts/admin/domain/value_objects/AdminName'
import { AdminPassword } from '@contexts/admin/domain/value_objects/AdminPassword'
import { AdminUsername } from '@contexts/admin/domain/value_objects/AdminUsername'
import { AdminPercentage } from '@contexts/admin/domain/value_objects/AdminPercentage'
import { AdminBalance } from '@contexts/admin/domain/value_objects/AdminBalance'
import { AdminDate } from '@contexts/admin/domain/value_objects/AdminDate'

@Service()
export class DynamodbAdminRepository implements AdminRepository {

  private readonly tableName = 'cronos_backoffice'
  constructor(private readonly connection: DynamodbConnection) {}

  async find(id: string): Promise<Admin | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `ADMIN#${id}`
      }
    })

    const response = await client.send(command)

    if (!response.Items) return null

    const item = response.Items[0]

    return new Admin(
      new AdminId(item.AdminId),
      new AdminName(item.Name),
      new AdminBalance(item.Balance),
      new AdminPercentage(item.Percentage),
      new AdminUsername(item.Username),
      new AdminPassword(item.Password),
      new AdminDate(new Date(item.CreatedAt))
    )
  }

  async findAll(): Promise<Admin[]> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :gsi1pk',
      ExpressionAttributeValues: {
        ':gsi1pk': 'ADMIN#'
      }
    })

    const response = await client.send(command)

    if (!response.Items) return []

    return response.Items.map((item) => new Admin(
      new AdminId(item.AdminId),
      new AdminName(item.Name),
      new AdminBalance(item.Balance),
      new AdminPercentage(item.Percentage),
      new AdminUsername(item.Username),
      new AdminPassword(item.Password),
      new AdminDate(new Date(item.CreatedAt))
    ))
  }

  async save(admin: Admin): Promise<void> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const item = new AdminDynamodbItem(admin)

    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: this.tableName,
            Item: item.toItem(),
          }
        }
      ]
    })


    await client.send(command)
  }
}