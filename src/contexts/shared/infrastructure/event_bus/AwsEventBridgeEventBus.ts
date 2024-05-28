import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge'
import { Service } from 'diod'

import { DomainEvent } from '../../domain/event/DomainEvent'
import { EventBus } from '../../domain/event/EventBus'
import { DomainEventJsonSerializer } from './DomainEventJsonSerializer'

@Service()
export class AwsEventBridgeEventBus implements EventBus {
	private readonly client = new EventBridgeClient({
		region: 'us-east-1',
		endpoint: 'http://127.0.0.1:4566'
	})

	private readonly eventBusName = 'cronos.domain_events'
	private readonly projectName = 'bets'

	constructor() {}

	async publish(events: DomainEvent[]): Promise<void> {
		const promises = events.map(async (event) => {
			const serializedEvent = DomainEventJsonSerializer.serialize(event)

			await this.publishRaw(event.eventId, event.eventName, serializedEvent)
		})

		await Promise.all(promises)
	}

	private async publishRaw(_eventId: string, eventName: string, serializedEvent: string) {
		try {
			return await this.client.send(
				new PutEventsCommand({
					Entries: [
						{
							EventBusName: this.eventBusName,
							Detail: serializedEvent,
							DetailType: eventName,
							Source: this.projectName
						}
					]
				})
			)
		} catch (error: unknown) {
			return
			//return this.failover.publish(eventId, eventName, serializedEvent);
		}
	}
}
