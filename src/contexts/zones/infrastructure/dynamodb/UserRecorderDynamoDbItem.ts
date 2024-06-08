import { AttributeValue } from "@aws-sdk/client-dynamodb"
import { Item } from "@contexts/shared/infrastructure/dynamodb/Item"
import { User } from "@contexts/zones/domain/User"

export class UserRecorderDynamodbItem extends Item{

    constructor(private readonly user: User, private readonly clubId: string) {
        super()
    }

    get pk(): string {
        return `USER#${this.user.id}`
    }

    get sk(): string {
        return `CLUB#${this.clubId}`
    }

    toItem(): Record<string, AttributeValue> {
        return {
            ...this.keys(),
            Id: {S: this.user.id},
            Name: {S: this.user.name},
        }
    }

}