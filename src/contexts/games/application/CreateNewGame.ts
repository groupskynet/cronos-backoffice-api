import { Game } from "../domain/Game";
import { GameRepository } from "../domain/GameRepository";

export class CreateNewGame {
    private readonly _repository : GameRepository; 

    constructor(repository: GameRepository) {
        this._repository = repository;
    }

    async run(): Promise<void> {
        const game = Game.create('',[]);
        await this._repository.save(game);
    }
}