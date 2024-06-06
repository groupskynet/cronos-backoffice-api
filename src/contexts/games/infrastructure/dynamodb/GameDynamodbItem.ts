import { Game } from '@contexts/games/domain/Game'
import { Item } from '@contexts/shared/infrastructure/dynamodb/Item'

export class GameDynamodbItem extends Item {
  constructor(private readonly game: Game) {
    super()
  }

  get pk(): string {
    return `GAME#${this.game.id}`
  }

  get sk(): string {
    return `#METADATA#`
  }

  get gsi1_pk(): string {
    return `GAME#${this.game.status}`
  }

  get gsi1_sk(): string {
    return `GAME#${this.game.id}`
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      Balls: { L: this.game.balls.map((item) => ({ N: item.toString() })) },
      Round: { S: this.game.round.toString() },
      GSI1PK: { S: this.gsi1_pk },
      GSI1SK: { S: this.gsi1_sk },
      Status: { S: this.game.status.toString() },
      GameId: { S: this.game.id },
      CreatedAt: { S: this.game.created_at.toString() }
    }
  }
}
