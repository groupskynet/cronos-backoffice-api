import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { GetCommand } from '@aws-sdk/lib-dynamodb'
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
  async getFindbyName(name: string): Promise<User | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        PK: `USER#${name}`,
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
      name: new UserName(response.Item.Name),
      password: new UserPassword(EncryptAES256.decrypt(response.Item.Password)),
      enabled: response.Item.Enabled
    })

    return user
  }
}
