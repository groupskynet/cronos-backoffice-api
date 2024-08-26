import { Club } from '@contexts/admin/domain/entity/Club'
import { Item } from '@contexts/shared/infrastructure/dynamodb/Item'
import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb'

export class ClubDynamodbItem extends Item {
    constructor(private readonly club: Club, private readonly adminId: string) {
        super()
    }

    get pk(): string {
        return `ADMIN#${this.adminId}`
    }

    get sk(): string {
        return `CLUB#${this.club.id}`
    }

    get gsi1_pk(): string {
        return `CLUB#`
    }

    get gsi1_sk(): string {
        return `CLUB#${this.club.id}`
    }

    toItem(): Record<string, NativeAttributeValue> {
        return {
            ...this.keys(),
            Id: {S: this.club.id},
            Name: {S: this.club.name},
            Balance: {N: this.club.balance.toString()},
            // Demography: { S: JSON.stringify(this.club.demography.toPrimitives()) },
            Demography: {
                M: {
                    name: {S: this.club.demography._name.value},
                    address: {S: this.club.demography._address.value},
                    timeZone: {S: this.club.demography._timeZone.value}
                }
            },
            GSI1PK: {S: this.gsi1_pk},
            GSI1SK: {S: this.gsi1_sk},
            CreatedAt: {S: this.club.createdAt.toString()}
        }
    }
}