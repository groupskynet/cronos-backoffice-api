import { Game } from '@contexts/games/domain/Game'
import { GameRepository } from '@contexts/games/domain/contracts/GameRepository'

export class GameRepositoryMock extends GameRepository {
  private readonly mock = jest.fn()
  async save(game: Game): Promise<void> {
    await this.mock(game)
  }
}
