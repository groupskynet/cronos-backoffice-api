import { GameRepository } from "../domain/contracts/GameRepository"

export class DynamodbGameRepository implements GameRepository {
  save(): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
