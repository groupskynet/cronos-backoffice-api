Feature: I want to query a game that is pending to play
  In order to know if a game is pending to play
  As a user
  I want to query a game that is pending to play

  Scenario: query a game that is pending to play
    Given I send a GET request to "/game/pending_by_played"
    Then the response status code should be 200
    And the response should be:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "balls": [2, 9, 7, 9, 12, 8, 18, 2, 38, 29, 20],
      "createdAt": "2023-01-20T00:00:00.000Z",
      "round": "1"
    }
    """
