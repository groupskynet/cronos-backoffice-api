import { Game } from '../domain/Game'
import { GameRepository } from '../domain/contracts/GameRepository'
import { GameId } from '../domain/value_objects/GameId'

export class DynamodbGameRepository implements GameRepository {
  find(id: GameId): Promise<Game> | null {
    console.log(id)
    throw new Error('Method not implemented.')
  }

  save(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
