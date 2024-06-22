import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { User } from '../domain/User'
import { UserRepository } from '../domain/contracts/UserRepository'
import { UserDynamodbItem } from './dynamodb/UserDynamodbItem'
import { TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { Service } from 'diod'

@Service()
export class DynamodbUserRepository implements UserRepository {
  private readonly tableName = 'cronos_backoffice'
  constructor(private readonly connection: DynamodbConnection) {}

  async saveOrUpdate(user: User): Promise<void> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const userModel = new UserDynamodbItem(user)

    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: this.tableName,
            Item: userModel.toItem()
          }
        }
      ]
    })
    await client.send(command).catch((error) => {
      console.log(error)
    })
  }
  async getFindbyId(id: string): Promise<User | null> {
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
      name: response.Item.Name,
      password: response.Item.Password
    })

    return user
  }
}
