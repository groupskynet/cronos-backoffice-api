import { Entity } from "./Entity"
import { DomainEvent } from "./event/DomainEvent"

export abstract class AggregateRoot extends Entity{

	private domainEvents: DomainEvent[] = []

  abstract toPrimitives(): unknown

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents
    this.domainEvents = []

    return domainEvents
  }

  record(event: DomainEvent): void {
    this.domainEvents.push(event)
  }
}
