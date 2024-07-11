import { DomainEventClass } from "@contexts/shared/domain/event/DomainEventClass"
import { DomainEventSubscriber } from "@contexts/shared/domain/event/DomainEventSuscriber"
import { TicketsCreateDomainEvent } from "@contexts/tickets/domain/events/TicketsCreateDomainEvent"
import { Service } from "diod"
import { UpdateBalanceTicketCreateService } from "../updateBalanceTicketCreate/UpdateBalanceTicketCreateService"

@Service()
export class UpdateBalanceOnTicketsCreate implements DomainEventSubscriber<TicketsCreateDomainEvent> {
    constructor(private readonly service: UpdateBalanceTicketCreateService) {}
    
    async on(event: TicketsCreateDomainEvent): Promise<void> {
        await this.service.handle({
            clubId: event.clubId,
            bets: event.bets,
        })
    }
    subscribedTo(): DomainEventClass<TicketsCreateDomainEvent>[] {
        return [TicketsCreateDomainEvent]
    }
    name(): string {
        return "cronos.backoffice.tickets.update_balance_on_tickets_create"
    }

}