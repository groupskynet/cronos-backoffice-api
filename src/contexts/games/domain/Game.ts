import { AggregateRoot } from "@src/contexts/shared/domain/AggregateRoot";
import { GameBalls } from "./GameBalls";
import { GameId } from "./GameId";

export class Game extends AggregateRoot {
    private _id: GameId;
    private _balls: GameBalls;

    constructor(id: GameId, balls: GameBalls) {
        super();
        this._id = id;
        this._balls = balls;
    }

    static create(id: string, balls: number[]) : Game {
        const game = new Game(new GameId(id), new GameBalls(balls));
        return game;
    }

    get balls() : number[] {
        return this._balls.value;
    }

    get id() : string {
        return this._id.value;
    }
}