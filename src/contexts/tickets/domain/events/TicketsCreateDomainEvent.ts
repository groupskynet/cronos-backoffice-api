import { DomainEvent, DomainEventAttributes } from "@contexts/shared/domain/event/DomainEvent"

export class TicketsCreateDomainEvent extends DomainEvent {
    static eventName: string = 'cronos.keno.ticket_created'
    constructor(
        public readonly ticketId: string,
        public readonly dateTickets: Date,
        public readonly gameId: string,
        public  readonly clubId: string,
        public readonly bets: {
            betId: string,
            nums: number[],
            amount: number,
            dateBets: Date,
        }[],
        eventId?: string,
        occurredOn?: Date,){
            super(TicketsCreateDomainEvent.eventName, ticketId, eventId, occurredOn)
        }
    toPrimitives(): DomainEventAttributes {
        return {
            ticketId: this.ticketId,
            dateTickets: this.dateTickets,
            gameId: this.gameId,
            bets: this.bets,
            clubId: this.clubId,
        }
    }

}