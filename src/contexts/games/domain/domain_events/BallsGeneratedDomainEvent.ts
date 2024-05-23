import { DomainEvent, DomainEventAttributes } from '@contexts/shared/domain/event/DomainEvent';

export class BallsGeneratedDomainEvent extends DomainEvent {
  static eventName: string = 'cronos.keno.game.balls_generated';

  constructor(
    public readonly id: string,
    public readonly balls: number[],
    public readonly createdAt: Date,
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(BallsGeneratedDomainEvent.eventName, id, eventId, occurredOn);
  }

  toPrimitives(): DomainEventAttributes {
    return {
      id: this.id,
      balls: this.balls,
      createdAt: this.createdAt,
    };
  }
}
