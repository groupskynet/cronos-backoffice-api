aws dynamodb create-table \
	--endpoint-url http://localhost:4566 \
	--table-name cronos_keno \
	--attribute-definitions \
	AttributeName=pk,AttributeType=S \
	AttributeName=sk,AttributeType=S \
	--key-schema \
	AttributeName=pk,KeyType=HASH \
	AttributeName=sk,KeyType=RANGE \
	--provisioned-throughput \
	ReadCapacityUnits=5,WriteCapacityUnits=5
