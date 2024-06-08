import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb'

export abstract class Item {
  abstract get pk(): string
  abstract get sk(): string

  public keys() {
    return {
      PK: { S: this.pk },
      SK: { S: this.sk }
    }
  }

  abstract toItem(): Record<string, NativeAttributeValue>
}
