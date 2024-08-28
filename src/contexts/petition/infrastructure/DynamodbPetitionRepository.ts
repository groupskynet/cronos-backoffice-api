import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { PetitionDynamodbItem } from './dynamodb/PetitionDynamodbItem'
import { PetitionRepository } from '../domain/contracts/PetitionRepository'
import { Petition } from '../domain/Petition'
import { Service } from 'diod'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import {  TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb'
import { PetitionId} from '@contexts/petition/domain/value_objects/PetitionId'
import { PetitionAdminCount } from '@contexts/petition/domain/value_objects/PetitionAdminCount'
import { PetitionClubCount } from '@contexts/petition/domain/value_objects/PetitionClubCount'
import { PetitionUserCount } from '@contexts/petition/domain/value_objects/PetitionUserCount'
import { PetitionEmail } from '@contexts/petition/domain/value_objects/PetitionEmail'
import { PetitionDescription } from '@contexts/petition/domain/value_objects/PetitionDescription'
import { PetitionPhone } from '@contexts/petition/domain/value_objects/PetitionPhone'
import { PetitionDate } from '@contexts/petition/domain/value_objects/PetitionDate'
import { AdminId } from "@contexts/admin/domain/value_objects/AdminId";
import { PetitionStatus } from "@contexts/petition/domain/value_objects/PetitionStatus";

@Service()
export class DynamodbPetitionRepository implements PetitionRepository {
    private readonly tableName = 'cronos_backoffice'
    constructor(private readonly connection: DynamodbConnection) {}

    async findById(id: PetitionId): Promise<Petition | null> {
        const client = this.connection.client

        if (!client) throw new Error('DynamodbClient not found')

        const command = new QueryCommand({
            TableName: this.tableName,
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1PK = :gsi1pk and GSI1SK = :gsi1sk',
            ExpressionAttributeValues: {
                ':gsi1pk': 'PETITION#',
                ':gsi1sk': `PETITION#${id.value}`
            }

        })

        const response = await client.send(command)

        if (!response.Items) return null

        const item = response.Items[0]
        return new Petition(
            new PetitionId(item.Id),
            new PetitionAdminCount(item.AdminCount),
            new PetitionClubCount(item.ClubCount),
            new PetitionUserCount(item.UserCount),
            new PetitionEmail(item.Email),
            new PetitionDescription(item.Description),
            new PetitionPhone(item.Phone),
            PetitionStatus.getInstance(item.Status),
            new AdminId(item.AdminId),
            new PetitionDate(new Date(item.CreatedAt))
        )
    }

    async findAll(): Promise<Petition[]> {
        const client = this.connection.client

        if (!client) throw new Error('DynamodbClient not found')

        const command = new QueryCommand({
            TableName: this.tableName,
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1PK = :gsi1pk',
            ExpressionAttributeValues: {
                ':gsi1pk': 'PETITION#'
            }
        })

        const response = await client.send(command)

        if (!response.Items) return []

        return response.Items.map((item) => new Petition(
            new PetitionId(item.Id),
            new PetitionAdminCount(item.AdminCount),
            new PetitionClubCount(item.ClubCount),
            new PetitionUserCount(item.UserCount),
            new PetitionEmail(item.Email),
            new PetitionDescription(item.Description),
            new PetitionPhone(item.Phone),
            PetitionStatus.getInstance(item.Status),
            new AdminId(item.AdminId),
            new PetitionDate(new Date(item.CreatedAt))
        ))
    }

    async save(petition: Petition): Promise<void> {
        const client = this.connection.client

        if (!client) throw new Error('DynamodbClient not found')

        const petitionItem = new PetitionDynamodbItem(petition)

        const command = new TransactWriteItemsCommand({
            TransactItems: [
                {
                    Put: {
                        TableName: this.tableName,
                        Item: petitionItem.toItem(),
                    }
                }
            ]
        })

        await client.send(command)
    }
}