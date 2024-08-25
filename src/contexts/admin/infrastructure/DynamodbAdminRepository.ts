import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { AdminDynamodbItem } from './dynamodb/AdminDynamodbItem'
import { AdminRepository } from '../domain/contracts/AdminRepository'
import { Admin } from '../domain/Admin'
import { Service } from 'diod'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { TransactWriteItem,TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { AdminId } from '@contexts/admin/domain/value_objects/AdminId'
import { AdminName } from '@contexts/admin/domain/value_objects/AdminName'
import { AdminPassword } from '@contexts/admin/domain/value_objects/AdminPassword'
import { AdminUsername } from '@contexts/admin/domain/value_objects/AdminUsername'
import { AdminPercentage } from '@contexts/admin/domain/value_objects/AdminPercentage'
import { AdminBalance } from '@contexts/admin/domain/value_objects/AdminBalance'
import { AdminDate } from '@contexts/admin/domain/value_objects/AdminDate'
import { ClubName } from "@contexts/admin/domain/value_objects/ClubName";
import { ClubBalance } from "@contexts/admin/domain/value_objects/ClubBalance";
import { ClubDate } from "@contexts/admin/domain/value_objects/ClubDate";
import { Demography } from "@contexts/shared/domain/value_objects/Demography";
import { Club } from "@contexts/admin/domain/entity/Club";
import { Maybe } from "@contexts/shared/domain/Maybe";
import { ClubDynamodbItem } from "@contexts/admin/infrastructure/dynamodb/ClubDynamodbItem";

@Service()
export class DynamodbAdminRepository implements AdminRepository {

  private readonly tableName = 'cronos_backoffice'
  constructor(private readonly connection: DynamodbConnection) {}

  async findById(id: AdminId): Promise<Admin | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `ADMIN#${id.value}`
      }
    })

    const response = await client.send(command)

    if (!response.Items) return null

    const item = response.Items[0]
    const clubs = await this.getListClubsByAdminId(item.AdminId, client)
    return new Admin(
      new AdminId(item.AdminId),
      new AdminName(item.Name),
      new AdminBalance(item.Balance),
      new AdminPercentage(item.Percentage),
      new AdminUsername(item.Username),
      new AdminPassword(item.Password),
      clubs,
      new AdminDate(new Date(item.CreatedAt))
    )
  }

  async getListClubsByAdminId(id: string, client: any): Promise<Maybe<Club[]>> {
    const queryClubs = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `ADMIN#${id}`,
        ':sk': 'CLUB#'
      }
    })

    const clubsResponse = await client.send(queryClubs)

    let clubs: Club[] = []

    if(clubsResponse.Items && clubsResponse.Items.length > 0){
      clubs = clubsResponse.Items.map((item: any) => new Club(
          item.Id,
          new ClubName(item.Name),
          new ClubBalance(item.Balance),
          new Demography(
              item.Demography.name,
              item.Demography.address,
              item.Demography.timeZone
          ),
          new ClubDate(new Date(item.CreatedAt))
      ))
    }

    return clubs ? Maybe.some(clubs) : Maybe.none()
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


    return await Promise.all(response.Items.map(async (item) => new Admin(
      new AdminId(item.AdminId),
      new AdminName(item.Name),
      new AdminBalance(item.Balance),
      new AdminPercentage(item.Percentage),
      new AdminUsername(item.Username),
      new AdminPassword(item.Password),
      await this.getListClubsByAdminId(item.AdminId, client),
      new AdminDate(new Date(item.CreatedAt))
    )))
  }

  async save(admin: Admin): Promise<void> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const adminItem = new AdminDynamodbItem(admin)
    const clubsItem: TransactWriteItem[] = []

    if(!admin.clubs.isEmpty()){
      admin.clubs.get().forEach((club: Club) => {
        const clubModel = new ClubDynamodbItem(club, admin.id)
        clubsItem.push({
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
            Item: adminItem.toItem(),
          }
        },
          ...clubsItem
      ]
    })

    await client.send(command)
  }
}