import { DomainEvent, DomainEventAttributes } from "@src/contexts/shared/domain/event/DomainEvent";

export class GameDomainEvent extends DomainEvent {
	static eventName = "cronos.keno.game.*";

	constructor(
		eventName: string,
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date,
	) {
		super(eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes,
	): GameDomainEvent {
		return new GameDomainEvent(GameDomainEvent.eventName, aggregateId, eventId, occurredOn);
	}

	toPrimitives(): { [key: string]: unknown } {
		return {
			id: this.id,
		};
	}
}