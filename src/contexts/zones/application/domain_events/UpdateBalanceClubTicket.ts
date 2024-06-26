import { DomainEventClass } from "@contexts/shared/domain/event/DomainEventClass"
import { DomainEventSubscriber } from "@contexts/shared/domain/event/DomainEventSuscriber"
import { BalanceClubTicketDomainEvent } from "@contexts/zones/domain/domain_events/BalanceClubTicketDomainEvent"

export class UpdateBalanceClubTicket implements DomainEventSubscriber<BalanceClubTicketDomainEvent> {
    on(domainEvent: BalanceClubTicketDomainEvent): Promise<void> {
        console.log({domainEvent})
        throw new Error("Method not implemented.")
    }
    subscribedTo(): DomainEventClass<BalanceClubTicketDomainEvent>[] {
        throw new Error("Method not implemented.")
    }
    name(): string {
        throw new Error("Method not implemented.")
    }

}