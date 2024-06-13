import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb'
import { Item } from '@contexts/shared/infrastructure/dynamodb/Item'
import { User } from '@contexts/zones/domain/User'

export class UserRecorderDynamodbItem extends Item {
  constructor(
    private readonly user: User,
    private readonly clubId: string
  ) {
    super()
  }

  get pk(): string {
    return `CLUB#${this.clubId}`
  }

  get sk(): string {
    return `USER#${this.user.id}`
  }

  toItem(): Record<string, NativeAttributeValue> {
    return {
      ...this.keys(),
      Id: { S: this.user.id },
      Name: { S: this.user.name }
    }
  }
}
