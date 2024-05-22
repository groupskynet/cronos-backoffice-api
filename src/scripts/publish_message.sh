aws events put-events \
	--endpoint-url http://localhost:4566 \
	--region us-east-1 \
	--entries '[{
		"EventBusName": "codely.domain_events",
		"Source": "cronos.backoffice",
		"DetailType": "balls.generated",
		"Detail": "{ \"user_id\": \"123\", \"email\": \"javi@hola.com\" }"
	}]'