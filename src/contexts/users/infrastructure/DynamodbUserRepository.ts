import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { Service } from 'diod'
import { UserRepository } from '../domain/contracts/UserRepository'
import { User } from '../domain/User'
import { UserDynamodbItem } from './dynamodb/UserDynamodbItem'
import { UserPassword } from '../domain/value_objects/user/UserPassword'
import { UserName } from '../domain/value_objects/user/UserName'
import { EncryptAES256 } from './encrypts/EncryptAES256'

@Service()
export class DynamodbUserRepository implements UserRepository {
  private readonly tableName = 'cronos_backoffice'
  constructor(private readonly connection: DynamodbConnection) {
  }
  async findbyName(name: string): Promise<User | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `USER#${name}`,
      }
    })

    const response = await client.send(command)
    console.log(response.Items)
    if (!response.Items || response.Items.length === 0) return null
    
    const userItem = response.Items[0]

    const user = new User({
      id: userItem.Id,
      name: new UserName(userItem.Name),
      password: new UserPassword(EncryptAES256.decrypt(userItem.Password)),
      enabled: userItem.Enabled
    })

    return user
  }

  async saveOrUpdate(user: User): Promise<void> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const userModel = new UserDynamodbItem(user)

    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: this.tableName,
            Item: {
              ...userModel.toItem(),
              Password: { S: EncryptAES256.encrypt(user.password) }
            }
          }
        }
      ]
    })
    await client.send(command).catch((error) => {
      console.log(error)
    })
  }
  async findbyId(id: string): Promise<User | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        PK: `USER#${id}`,
        SK: `#METADATA#`
      }
    })

    const response = await client.send(command)

    if (!response.Item) return null

    const user = new User({
      id: response.Item.Id,
      name: new UserName(response.Item.Name),
      password: new UserPassword(EncryptAES256.decrypt(response.Item.Password)),
      enabled: response.Item.Enabled
    })

    return user
  }
}
