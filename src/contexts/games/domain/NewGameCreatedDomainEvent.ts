import { DomainEventAttributes } from "@src/contexts/shared/domain/event/DomainEvent";
import { GameDomainEvent } from "./GameEvent";


export class NewGameCreatedDomainEvent extends GameDomainEvent{

    static eventName : string = "cronos.keno.game.created"

    constructor(
		public readonly id: string,
		public readonly balls: number[],
		eventId?: string,
		occurredOn?: Date,
	) {
		super(NewGameCreatedDomainEvent.eventName, id, eventId, occurredOn);
	}

    static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes,
	): NewGameCreatedDomainEvent {
		return new NewGameCreatedDomainEvent(
			aggregateId,
			attributes.balls as number[],
			eventId,
			occurredOn,
		);
	}


    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            balls: this.balls
        }
    }

}