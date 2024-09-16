import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { ClubDynamodbItem } from './dynamodb/ClubDynamodbItem'
import { UserDynamodbItem} from '@contexts/users/infrastructure/dynamodb/UserDynamodbItem'
import { ClubRepository } from '../domain/contracts/ClubRepository'
import { Club } from '../domain/entity/Club'
import { Service } from 'diod'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { TransactWriteItem,TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { ClubId } from '@contexts/admin/domain/value_objects/ClubId'
import { ClubName } from '@contexts/admin/domain/value_objects/ClubName'
import { ClubBalance } from '@contexts/admin/domain/value_objects/ClubBalance'
import { ClubDate } from '@contexts/admin/domain/value_objects/ClubDate'
import { Demography } from '@contexts/shared/domain/value_objects/Demography'
import { Maybe } from '@contexts/shared/domain/Maybe'
import { AdminId } from '@contexts/admin/domain/value_objects/AdminId'
import { User } from '@contexts/users/domain/User'
import { UserId } from '@contexts/users/domain/value_objects/UserId'
import { UserName } from '@contexts/users/domain/value_objects/UserName'
import { UserUsername } from '@contexts/users/domain/value_objects/UserUsername'
import { UserPassword } from '@contexts/users/domain/value_objects/UserPassword'
import { UserEnabled } from '@contexts/users/domain/value_objects/UserEnabled'
import { UserDate } from '@contexts/users/domain/value_objects/UserDate'

@Service()
export class DynamodbClubRepository implements ClubRepository {

  private readonly tableName = 'cronos_backoffice'
  constructor(private readonly connection: DynamodbConnection) {}

  async findById(id: ClubId): Promise<Club | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :gsi1pk and GSI1SK = :gsi1sk',
      ExpressionAttributeValues: {
        ':gsi1pk': 'CLUB#',
        ':gsi1sk': `CLUB#${id.value}`
      }
    })

    const response = await client.send(command)

    if (!response.Items) return null

    const item = response.Items[0]
    const users = await this.getListUsersByClubId(item.Id, client)
    return new Club(
      item.Id,
      new ClubName(item.Name),
      new ClubBalance(item.Balance),
      new Demography(
        item.Demography.name,
        item.Demography.address,
        item.Demography.timeZone
      ),
      users,
      new ClubDate(new Date(item.CreatedAt))
    )
  }

  async getListUsersByClubId(id: string, client: DynamoDBDocumentClient): Promise<Maybe<User[]>> {
    const queryUsers = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `CLUB#${id}`,
        ':sk': 'USER#'
      }
    })

    const usersResponse = await client.send(queryUsers)

    let users: User[] = []

    if(usersResponse.Items && usersResponse.Items.length > 0){
      users = usersResponse.Items.map((item: any) => new User(
        new UserId(item.Id),
        new UserName(item.Name),
        new UserUsername(item.Username),
        new UserPassword(item.Password),
        new UserEnabled(item.Enabled),
        new ClubId(item.ClubId),
        new UserDate(new Date(item.CreatedAt))
      ))
    }

    return users ? Maybe.some(users) : Maybe.none()
  }

  async findAll(): Promise<Club[]> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :gsi1pk',
      ExpressionAttributeValues: {
        ':gsi1pk': 'CLUB#'
      }
    })

    const response = await client.send(command)

    if (!response.Items) return []

    return await Promise.all(response.Items.map(async (item) => new Club(
      item.Id,
      new ClubName(item.Name),
      new ClubBalance(item.Balance),
      new Demography(
        item.Demography.name,
        item.Demography.address,
        item.Demography.timeZone
      ),
      await this.getListUsersByClubId(item.Id, client),
      new ClubDate(new Date(item.CreatedAt))
    )))
  }

  async update(club: Club, adminId: AdminId ): Promise<void> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const clubItem = new ClubDynamodbItem(club, adminId.value)
    const usersItem: TransactWriteItem[] = []

    if(!club.users.isEmpty()){
      club.users.get().forEach((user: User) => {
        const userModel = new UserDynamodbItem(user)
        usersItem.push({
          Put: {
            TableName: this.tableName,
            Item: userModel.toItem(),
          }
        })
      })
    }

    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: this.tableName,
            Item: clubItem.toItem(),
          }
        },
          ...usersItem
      ]
    })

    await client.send(command)
  }
}