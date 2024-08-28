import { Petition } from '@contexts/petition/domain/Petition'
import { Item } from '@contexts/shared/infrastructure/dynamodb/Item'
import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb'

export class PetitionDynamodbItem extends Item {
    constructor(private readonly petition: Petition) {
        super()
    }

    get pk(): string {
        return `ADMIN#${this.petition.adminId}`
    }

    get sk(): string {
        return `PETITION#${this.petition.id}`
    }

    get gsi1_pk(): string {
        return `PETITION#`
    }

    get gsi1_sk(): string {
        return `PETITION#${this.petition.id}`
    }

    toItem(): Record<string, NativeAttributeValue> {
        return {
            ...this.keys(),
            Id: { S: this.petition.id },
            AdminCount: { N: this.petition.adminCount.toString() },
            ClubCount: { N: this.petition.clubCount.toString() },
            UserCount: { N: this.petition.userCount.toString() },
            Email: { S: this.petition.email },
            Description: { S: this.petition.description },
            Phone: { S: this.petition.phone },
            Status: { S: this.petition.status },
            AdminId: { S: this.petition.adminId },
            CreatedAt: { S: this.petition.createdAt.toString() },
            GSI1PK: { S: this.gsi1_pk },
            GSI1SK: { S: this.gsi1_sk }
        }
    }
}