aws dynamodb create-table \
	--endpoint-url http://localhost:4566 \
	--table-name cronos_backoffice \
	--attribute-definitions \
	AttributeName=PK,AttributeType=S \
	AttributeName=SK,AttributeType=S \
	AttributeName=GSI1PK,AttributeType=S \
	AttributeName=GSI1SK,AttributeType=S \
	--key-schema \
	AttributeName=PK,KeyType=HASH \
	AttributeName=SK,KeyType=RANGE \
	--provisioned-throughput \
	ReadCapacityUnits=5,WriteCapacityUnits=5 \
	--global-secondary-indexes \
	"[
            {
                \"IndexName\": \"GSI1\",
                \"KeySchema\": [{\"AttributeName\":\"GSI1PK\",\"KeyType\":\"HASH\"},
                                {\"AttributeName\":\"GSI1SK\",\"KeyType\":\"RANGE\"}],
                \"Projection\":{
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 10,
                    \"WriteCapacityUnits\": 5
                }
            } 
        ]"
