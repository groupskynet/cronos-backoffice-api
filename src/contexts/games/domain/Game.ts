import { AggregateRoot } from "@contexts/shared/domain/AggregateRoot";
import { GameBalls } from "./GameBalls";
import { GameId } from "./GameId";
import { GameDate } from "./GameDate";
import { GameRound } from "./GameRound";

export class Game extends AggregateRoot {
  private _id: GameId;
  private _balls: GameBalls;
  private createdAt: GameDate;
  private _round: GameRound;

  constructor(
    id: GameId,
    balls: GameBalls,
    round: GameRound,
    createdAt: GameDate,
  ) {
    super();
    this._id = id;
    this._balls = balls;
    this.createdAt = createdAt;
    this._round = round;
  }

  static create(
    id: string,
    balls: number[],
    createdAt: Date,
    round: string,
  ): Game {
    const game = new Game(
      new GameId(id),
      new GameBalls(balls),
      new GameRound(round),
      new GameDate(createdAt),
    );
    return game;
  }

  get id(): string {
    return this._id.value;
  }

  get balls(): number[] {
    return this._balls.value;
  }

  get round(): string {
    return this._round.value;
  }

  created_at(): Date {
    return this.createdAt.value;
  }
}
