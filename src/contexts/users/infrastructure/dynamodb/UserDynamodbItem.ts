import { User } from '@contexts/users/domain/User'
import { Item } from '@contexts/shared/infrastructure/dynamodb/Item'
import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb'

export class UserDynamodbItem extends Item {
    constructor(private readonly user: User) {
        super()
    }

    get pk(): string {
        return `CLUB#${this.user.clubId}`
    }

    get sk(): string {
        return `USER#${this.user.id}`
    }

    get gsi1_pk(): string {
        return `USER#`
    }

    get gsi1_sk(): string {
        return `USER#${this.user.id}`
    }

    toItem(): Record<string, NativeAttributeValue> {
        return {
            ...this.keys(),
            Id: { S: this.user.id },
            Name: { S: this.user.name },
            Username: { S: this.user.username },
            Password: { S: this.user.password },
            Enabled: { BOOL: this.user.enabled },
            ClubId: { S: this.user.clubId },
            CreatedAt: { S: this.user.createdAt.toString() },
            GSI1PK: { S: this.gsi1_pk },
            GSI1SK: { S: this.gsi1_sk }
        }
    }
}