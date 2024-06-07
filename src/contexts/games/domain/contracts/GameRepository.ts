import { Game } from '../Game'
import { GameId } from '../value_objects/GameId'

export abstract class GameRepository {
  abstract save(game: Game): Promise<void>
  abstract find(id: GameId): Promise<Game> | null
  abstract findPendingGame(): Promise<Game | null>
}
