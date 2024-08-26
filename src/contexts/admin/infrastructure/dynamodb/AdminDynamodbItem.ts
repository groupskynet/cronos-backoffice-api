import { Admin } from '@contexts/admin/domain/Admin'
import { Item } from '@contexts/shared/infrastructure/dynamodb/Item'
import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb'

export class AdminDynamodbItem extends Item {
  constructor(private readonly admin: Admin) {
    super()
  }

  get pk(): string {
    return `ADMIN#${this.admin.id}`
  }

  get sk(): string {
    return `#METADATA#`
  }

  get gsi1_pk(): string {
    return `ADMIN#`
  }

  get gsi1_sk(): string {
    return `ADMIN#${this.admin.id}`
  }

  toItem(): Record<string, NativeAttributeValue> {
    return {
      ...this.keys(),
      Name: { S: this.admin.name },
      Balance: { N: this.admin.balance.toString() },
      Percentage: { N: this.admin.percentage.toString() },
      GSI1PK: { S: this.gsi1_pk },
      GSI1SK: { S: this.gsi1_sk },
      Username: { S: this.admin.username },
      Password: { S: this.admin.password },
      AdminId: { S: this.admin.id },
      CreatedAt: { S: this.admin.createdAt.toString() }
    }
  }
}