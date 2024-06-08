import { AttributeValue } from "@aws-sdk/client-dynamodb"
import { Item } from "@contexts/shared/infrastructure/dynamodb/Item"
import { User } from "@contexts/zones/domain/User"

export class UserAdminDynamodbItem extends Item{

    constructor(private readonly user: User, private readonly zoneId: string) {
        super()
    }

    get pk(): string {
        return `USER#${this.user.id}`
    }

    get sk(): string {
        return `ZONE#${this.zoneId}`
    }

    toItem(): Record<string, AttributeValue> {
        return {
            ...this.keys(),
            Id: {S: this.user.id},
            Name: {S: this.user.name}
        }
    }

}