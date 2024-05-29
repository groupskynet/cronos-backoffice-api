import { DomainEventSubscriber } from '@src/contexts/shared/domain/event/DomainEventSuscriber'
import { DomainEventClass } from '@src/contexts/shared/domain/event/DomainEventClass'
import { Service } from 'diod'
import { BallsGeneratedDomainEvent } from '../../domain/domain_events/BallsGeneratedDomainEvent'
import { CreateNewGameService } from '../CreateNewGameService'

@Service()
export class CreateNewGameOnBallsGenerated implements DomainEventSubscriber<BallsGeneratedDomainEvent> {
  constructor(private readonly service: CreateNewGameService) {}

  async on(event: BallsGeneratedDomainEvent): Promise<void> {
    this.service.handle({ id: event.id, balls: event.balls, createdAt: event.createdAt })
  }

  subscribedTo(): DomainEventClass<BallsGeneratedDomainEvent>[] {
    return [BallsGeneratedDomainEvent]
  }
  name(): string {
    return 'cronos.keno.game.create_new_game_on_balls_generated'
  }
}
