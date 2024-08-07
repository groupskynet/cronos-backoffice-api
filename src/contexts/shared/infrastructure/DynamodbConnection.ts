import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { Service } from 'diod'

@Service()
export class DynamodbConnection {
  private _client: DynamoDBDocumentClient | null = null

  constructor() {}

  get client(): DynamoDBDocumentClient | null {
    if (!this._client) {
      const client = new DynamoDBClient({
        region: 'us-west-1',
      })
      this._client = DynamoDBDocumentClient.from(client)
    }
    return this._client
  }
}
