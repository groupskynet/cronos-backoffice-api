import { Game } from "../Game";

export abstract class GameRepository {

  abstract save(game: Game): Promise<void>;

}
