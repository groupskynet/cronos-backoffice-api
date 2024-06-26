import { NativeAttributeValue } from "@aws-sdk/lib-dynamodb"
import { Item } from "@contexts/shared/infrastructure/dynamodb/Item"
import { User } from "@contexts/users/domain/User"

export class UserDynamodbItem extends Item {
    constructor(private readonly user: User) {
        super()
    }
    get pk(): string {
        return `USER#${this.user.id}`
    }
    get sk(): string {
        return `#METADATA#`
    }
    toItem(): Record<string, NativeAttributeValue> {
        return {
            ...this.keys(),
            Id: { S: this.user.id },
            Name: { S: this.user.name },
            Enabled: { BOOL: this.user.enabled }
        }
    }
    
}