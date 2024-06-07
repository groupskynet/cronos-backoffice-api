import { Service } from "diod"
import { Zone } from "../domain/Zone"
import { ZoneRepository } from "../domain/contracts/ZoneRepository"
import { DynamodbConnection } from "@contexts/shared/infrastructure/DynamodbConnection"
import { QueryCommand } from '@aws-sdk/lib-dynamodb'

@Service()
export class DynamodbZoneRepository implements ZoneRepository{

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

        return new Zone(
            {
                id:item.id,
                currency: item.currency,
                demography: item.demography,
                user: item.user
            }
        )
    }
    
    save(zone: Zone): Promise<void> {
        console.log(zone)
        throw new Error("Method not implemented.")
    }
    update(zone: Zone): Promise<void> {
        console.log(zone)
        throw new Error("Method not implemented.")
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

        return new Zone(
            {
                id:item.id,
                currency: item.currency,
                demography: item.demography,
                user: item.user
            }
        )
    }

}