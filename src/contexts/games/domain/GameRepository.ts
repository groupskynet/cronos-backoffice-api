export abstract class GameRepository {
  abstract save(): Promise<void>;
}
