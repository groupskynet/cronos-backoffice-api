import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb'
import { Item } from '@contexts/shared/infrastructure/dynamodb/Item'
import { Club } from '@contexts/zones/domain/Club'

export class ClubDynamodbItem extends Item {
  constructor(
    private readonly club: Club,
    private readonly zoneId: string
  ) {
    super()
  }
  get pk(): string {
    return `ZONE#${this.zoneId}`
  }
  get sk(): string {
    return `CLUB#${this.club.id}`
  }

  get gsi1_pk(): string {
    return `CLUB#`
  }

  get gsi1_sk(): string {
    return this.pk
  }

  toItem(): Record<string, NativeAttributeValue> {
    return {
      ...this.keys(),
      Id: { S: this.club.id },
      Balance: { S: this.club.balance.toString() },
      Demography:  {
        M: {
          name: { S: this.club.demography.name.value },
          address: { S: this.club.demography.address.value },
          timeZone: { S: this.club.demography.timeZone.value }
        }
      },
      GSI1PK: { S: this.gsi1_pk },
      GSI1SK: { S: this.gsi1_sk },
    }
  }
}

