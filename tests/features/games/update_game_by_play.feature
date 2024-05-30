Feature: Quiero actualizar un juego 
  que este pendiente por jugar

  Scenario: un juego esta pendiente por asignarle las balotas
    Given I send a PUT request to "/game/update/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "balls": [2, 9, 7, 9, 12, 8, 18, 2, 38, 29, 20]
    }
    """
    Then the response status code should be 200
    And the response should be empty
