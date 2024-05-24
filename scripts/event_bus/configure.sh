# Event Bus
aws events \
	--endpoint-url http://localhost:4566 \
	--region us-east-1 \
	create-event-bus --name cronos.domain_events

# Queue
aws sqs \
	--endpoint-url http://localhost:4566 \
	--region us-east-1 \
	create-queue --queue-name update_game_on_balls_generated

# Subscription
aws events \
	--endpoint-url http://localhost:4566 \
	--region us-east-1 \
	put-rule --name rule-balls_generated \
	--event-bus-name cronos.domain_events \
	--event-pattern '{"detail-type": ["balls.generated"]}'

aws events put-targets --endpoint-url http://localhost:4566 \
	--region us-east-1 \
	--event-bus-name cronos.domain_events \
	--rule rule-user_registered
