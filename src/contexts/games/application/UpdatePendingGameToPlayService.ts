import { Service } from 'diod'
import { GameRepository } from '../domain/contracts/GameRepository'
import { GameId } from '../domain/value_objects/GameId'

@Service()
export class UpdatePendingGameToPlayService {
  constructor(private readonly repository: GameRepository) {}

  async run(id: string, balls: number[]): Promise<void> {
    const game = await this.repository.find(new GameId(id))
    if (!game) {
      throw new Error('game not found')
    }
    game.updateBalls(balls)
    await this.repository.save(game)
  }
}
