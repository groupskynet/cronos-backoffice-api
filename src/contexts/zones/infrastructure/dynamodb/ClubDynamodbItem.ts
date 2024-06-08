import { AttributeValue } from "@aws-sdk/client-dynamodb"
import { Item } from "@contexts/shared/infrastructure/dynamodb/Item"
import { Club } from "@contexts/zones/domain/Club"

export class ClubDynamodbItem extends Item{
    
    constructor(private readonly club: Club, private readonly zoneId: string) {
        super()
      }
    get pk(): string {
        return `ZONE#${this.zoneId}`
    }
    get sk(): string {
        return `CLUB#${this.club.id}`
    }

    
    toItem(): Record<string, AttributeValue> {
        return {
            ...this.keys(),
            Id: {S: this.club.id},
            Balance: {L: this.club.balance},
            Demography: {M: this.club.demography},
        }
    }

}