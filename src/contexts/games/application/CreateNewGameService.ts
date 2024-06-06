import { Service } from 'diod'
import { Game } from '../domain/Game'
import { GameRepository } from '../domain/contracts/GameRepository'
import { GameRound } from '../domain/value_objects/GameRound'
import { EventBus } from '@contexts/shared/domain/event/EventBus'
import { Maybe } from '@contexts/shared/domain/Maybe'

@Service()
export class CreateNewGameService {
  constructor(
    private readonly repository: GameRepository,
    private readonly event_bus: EventBus
  ) {}

  async handle({ id, balls, createdAt }: { id: string; balls: number[]; createdAt: Date }): Promise<void> {
    const round = GameRound.generate()
    const game = Game.create(id, Maybe.some(balls), createdAt, round)
    this.repository.save(game)
    this.event_bus.publish(game.pullDomainEvents())
  }
}
