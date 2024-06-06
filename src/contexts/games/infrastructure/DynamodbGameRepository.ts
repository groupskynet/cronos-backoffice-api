import { DynamodbConnection } from '@contexts/shared/infrastructure/DynamodbConnection'
import { GameRepository } from '../domain/contracts/GameRepository'
import { GameId } from '../domain/value_objects/GameId'
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { Game } from '../domain/Game'
import { Service } from 'diod'
import { GameBalls } from '../domain/value_objects/GameBalls'
import { GameDate } from '../domain/value_objects/GameDate'
import { GameRound } from '../domain/value_objects/GameRound'
import { Maybe } from '@contexts/shared/domain/Maybe'
import { GameDynamodbItem } from './dynamodb/GameDynamodbItem'

@Service()
export class DynamodbGameRepository implements GameRepository {
  constructor(private readonly connection: DynamodbConnection) {}

  async findPendingGame(): Promise<Game | null> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const command = new QueryCommand({
      TableName: 'cronos_keno',
      IndexName: 'GSI1-Index',
      KeyConditionExpression: 'GSI1PK = :gsi1pk',
      ExpressionAttributeValues: {
        ':gsi1pk': 'GAME#PENDING'
      }
    })

    const response = await client.send(command)

    if (!response.Items) return null

    const item = response.Items[0]

    return new Game(
      new GameId(item.GameId),
      Maybe.fromValue<GameBalls>(item.Balls ? new GameBalls(item.Balls) : null),
      new GameRound(item.Round),
      new GameDate(item.CreatedAt),
      item.Status
    )
  }

  find(id: GameId): Promise<Game> | null {
    console.log(id)
    throw new Error('Method not implemented.')
  }

  async save(game: Game): Promise<void> {
    const client = this.connection.client

    if (!client) throw new Error('DynamodbClient not found')

    const item = new GameDynamodbItem(game)

    const command = new PutCommand({
      TableName: 'cronos_keno',
      Item: item.toItem(),
      ConditionExpression: 'attribute_not_exists(PK)'
    })

    await client.send(command)
  }
}
