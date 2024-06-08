import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb'
import { Item } from '@contexts/shared/infrastructure/dynamodb/Item'
import { Zone } from '@contexts/zones/domain/Zone'

export class ZoneDynamodbItem extends Item {
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

  toItem(): Record<string, NativeAttributeValue> {
    return {
      ...this.keys(),
      Id: { S: this.zone.id },
      Currency: { S: this.zone.currency },
      Balance: { N: this.zone.balance },
      Demography: {
        M: {
          name: { S: this.zone.demography.name.value },
          address: { S: this.zone.demography.address.value },
          timeZone: { S: this.zone.demography.timeZone.value }
        }
      },
      GSI1PK: { S: this.gsi1_pk },
      GSI1SK: { S: this.gsi1_sk },
      GSI2PK: { S: this.gsi2_pk },
      GSI2SK: { S: this.gsi2_sk }
    }
  }
}
