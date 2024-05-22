aws dynamodb put-item \
  --endpoint-url http://localhost:4566 \
    --table-name cronos_keno \
    --item '{
        "pk": {"S": "ticket#c23d5fe1-e172-48f0-99c8-59a80a2eddef"},
        "sk": {"S": "ticket#c23d5fe1-e172-48f0-99c8-59a80a2eddef#bet#29309a48-5a52-4f17-8491-853c8b747cd9"},
        "balls": {"L": [{"N": "20"}, {"N": "25"}]},
        "money": {"N": "2000"}
    }'
