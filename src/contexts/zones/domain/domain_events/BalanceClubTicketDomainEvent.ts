import { DomainEvent, DomainEventAttributes } from "@contexts/shared/domain/event/DomainEvent"

export class BalanceClubTicketDomainEvent extends DomainEvent {
    static eventName: string = 'cronos.backoffice'
    
    toPrimitives(): DomainEventAttributes {
        throw new Error("Method not implemented.")
    }


}