import { DomainEventSubscriber } from '@src/contexts/shared/domain/event/DomainEventSuscriber';
import { BallsGeneratedDomainEvent } from '../domain/BallsGeneratedDomainEvent';
import { CreateNewGame } from './CreateNewGame';
import { DomainEventClass } from '@src/contexts/shared/domain/event/DomainEventClass';
import { Service } from 'diod';

@Service()
export class CreateNewGameOnBallsGenerated implements DomainEventSubscriber<BallsGeneratedDomainEvent> {
  constructor(private readonly service: CreateNewGame) {}

  async on(event: BallsGeneratedDomainEvent): Promise<void> {
    this.service.handle({ id: event.id, balls: event.balls, createdAt: event.createdAt });
  }

  subscribedTo(): DomainEventClass<BallsGeneratedDomainEvent>[] {
    return [BallsGeneratedDomainEvent];
  }
  name(): string {
    return 'cronos.keno.game.create_new_game_on_balls_generated';
  }
}
