import { Service } from 'diod'
import { Game } from '../domain/Game'
import { GameRepository } from '../domain/contracts/GameRepository'

@Service()
export class QueryPendingGameToPlayService {
  constructor(private readonly repository: GameRepository) {}

  async run(): Promise<Game> {
    const game = await this.repository.findPendingGame()
    if (!game) {
      throw new Error('game not found')
    }
    return game
  }
}
