aws dynamodb put-item \
	--endpoint-url http://localhost:4566 \
	--table-name cronos_keno \
	--return-consumed-capacity TOTAL \
	--item '{
        "Pk": {"S": "GAME#ebac26f6-9577-4ff0-9e26-7dea402e2fff"},
        "Sk": {"S": "#METADATA#"},
        "Balls": {"L": [{"N": "20"}, {"N": "25"}]},
        "Round": {"S": "ROUND#1"},
        "GSI1Pk": {"S": "GAME#PENDING"},
        "GSI1Sk": {"S": "GAME#ebac26f6-9577-4ff0-9e26-7dea402e2fff"},
        "Status": {"S": "PENDING"},
        "GameId": {"S": "ebac26f6-9577-4ff0-9e26-7dea402e2fff"},
        "CreatedAt": {"S": "2023-01-01T00:00:00.000Z"},
        "UpdatedAt": {"S": "2023-01-01T00:00:00.000Z"}
    }'
