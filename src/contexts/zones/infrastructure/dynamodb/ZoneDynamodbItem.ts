import { Item } from "@contexts/shared/infrastructure/dynamodb/Item"
import { Zone } from "@contexts/zones/domain/Zone"

export class ZoneDynamodbItem extends Item{
    constructor(private readonly zone: Zone) {
        super()
      }
    get pk(): string {
        return `ZONE#${this.zone.id}`
    }
    get sk(): string {
        return `#METADATA#`
    }

    get gsi1_pk(): string {
        return `ZONE#`
      }
    
    get gsi1_sk(): string {
      return `ZONE#${this.zone.id}`
    }

    get gsi2_pk(): string {
      return `ZONE#${this.zone.demography.name}`
    }
  
    get gsi2_sk(): string {
      return `ZONE#${this.zone.id}`
    }

    toItem(): Record<string, unknown> {
        return {
            ...this.keys(),
            Id: {S: this.zone.id},
            Currency:{S: this.zone.currency},
            Balance: {L: this.zone.balance},
            User: {S: this.zone.user},
            Clubs: {S: this.zone.clubs},
            Demography: {S: this.zone.demography}
        }
    }

}