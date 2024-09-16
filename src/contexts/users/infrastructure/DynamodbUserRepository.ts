import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { UserDynamodbItem } from './dynamodb/UserDynamodbItem'
import { UserRepository } from '../domain/contracts/UserRepository'
import { User } from '../domain/User'
import { Service } from 'diod'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { UserId } from '@contexts/users/domain/value_objects/UserId'
import { UserName } from '@contexts/users/domain/value_objects/UserName'
import { UserUsername } from '@contexts/users/domain/value_objects/UserUsername'
import { UserPassword } from '@contexts/users/domain/value_objects/UserPassword'
import { UserEnabled } from '@contexts/users/domain/value_objects/UserEnabled'
import { UserDate } from '@contexts/users/domain/value_objects/UserDate'
import { ClubId } from '@contexts/admin/domain/value_objects/ClubId'

@Service()
export class DynamodbUserRepository implements UserRepository {
    private readonly tableName = 'cronos_backoffice'
    constructor(private readonly connection: DynamodbConnection) {}

    async findById(id: UserId): Promise<User | null> {
        const client = this.connection.client

        if (!client) throw new Error('DynamodbClient not found')

        const command = new QueryCommand({
            TableName: this.tableName,
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1PK = :gsi1pk and GSI1SK = :gsi1sk',
            ExpressionAttributeValues: {
                ':gsi1pk': 'USER#',
                ':gsi1sk': `USER#${id.value}`
            }

        })

        const response = await client.send(command)

        if (!response.Items) return null

        const item = response.Items[0]
        return new User(
            new UserId(item.Id),
            new UserName(item.Name),
            new UserUsername(item.Username),
            new UserPassword(item.Password),
            new UserEnabled(item.Enabled),
            new ClubId(item.ClubId),
            new UserDate(new Date(item.CreatedAt))
        )
    }

    async findAll(): Promise<User[]> {
        const client = this.connection.client

        if (!client) throw new Error('DynamodbClient not found')

        const command = new QueryCommand({
            TableName: this.tableName,
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1PK = :gsi1pk',
            ExpressionAttributeValues: {
                ':gsi1pk': 'USER#'
            }
        })

        const response = await client.send(command)

        if (!response.Items) return []

        return response.Items.map((item) => new User(
            new UserId(item.Id),
            new UserName(item.Name),
            new UserUsername(item.Username),
            new UserPassword(item.Password),
            new UserEnabled(item.Enabled),
            new ClubId(item.ClubId),
            new UserDate(new Date(item.CreatedAt))
        ))
    }

    async update(user: User): Promise<void> {
        const client = this.connection.client

        if (!client) throw new Error('DynamodbClient not found')

        const userItem = new UserDynamodbItem(user)

        const command = new TransactWriteItemsCommand({
            TransactItems: [
                {
                    Put: {
                        TableName: this.tableName,
                        Item: userItem.toItem(),
                    }
                }
            ]
        })

        await client.send(command)
    }
}