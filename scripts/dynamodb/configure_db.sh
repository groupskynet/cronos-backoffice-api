aws dynamodb create-table \
	--endpoint-url http://localhost:4566 \
	--table-name cronos_keno \
	--attribute-definitions \
	AttributeName=Pk,AttributeType=S \
	AttributeName=Sk,AttributeType=S \
	AttributeName=GSI1Pk,AttributeType=S \
	AttributeName=GSI1Sk,AttributeType=S \
	--key-schema \
	AttributeName=Pk,KeyType=HASH \
	AttributeName=Sk,KeyType=RANGE \
	--provisioned-throughput \
	ReadCapacityUnits=5,WriteCapacityUnits=5 \
	--global-secondary-indexes \
	"[
            {
                \"IndexName\": \"GSI1-Index\",
                \"KeySchema\": [{\"AttributeName\":\"GSI1Pk\",\"KeyType\":\"HASH\"},
                                {\"AttributeName\":\"GSI1Sk\",\"KeyType\":\"RANGE\"}],
                \"Projection\":{
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 10,
                    \"WriteCapacityUnits\": 5
                }
            } 
        ]"
