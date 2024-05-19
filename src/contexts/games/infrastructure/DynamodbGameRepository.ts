import { GameRepository } from "../domain/GameRepository";

export class DynamodbGameRepository implements GameRepository {
  save(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
