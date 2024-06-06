import { AggregateRoot } from '@contexts/shared/domain/AggregateRoot'
import { GameBalls } from './value_objects/GameBalls'
import { GameId } from './value_objects/GameId'
import { GameDate } from './value_objects/GameDate'
import { GameRound } from './value_objects/GameRound'
import { Maybe } from '@contexts/shared/domain/Maybe'

export class Game extends AggregateRoot {
  private _id: GameId
  private _balls: Maybe<GameBalls>
  private createdAt: GameDate
  private _round: GameRound
  private _status: 'PENDING' | 'PLAYED'

  constructor(
    id: GameId,
    balls: Maybe<GameBalls>,
    round: GameRound,
    createdAt: GameDate,
    status: 'PENDING' | 'PLAYED'
  ) {
    super()
    this._id = id
    this._balls = balls
    this.createdAt = createdAt
    this._round = round
    this._status = status
  }

  static create(id: string, balls: Maybe<number[]>, createdAt: Date, round: string): Game {
    const game = new Game(
      new GameId(id),
      balls.map((balls) => new GameBalls(balls)),
      new GameRound(round),
      new GameDate(createdAt),
      'PENDING'
    )
    return game
  }

  toPrimitives() {
    return {
      id: this._id.value,
      balls: this._balls.isDefined() ? this._balls.get().value : null,
      createdAt: this.createdAt.value,
      round: this._round.value,
      status: this._status
    }
  }

  public updateBalls(numbers: Maybe<number[]>): void {
    this._balls = numbers.map((balls) => new GameBalls(balls))
    this._status = 'PLAYED'
  }

  get id(): string {
    return this._id.value
  }

  get status(): string {
    return this._status
  }

  get balls(): Maybe<number[]> {
    return this._balls.map((balls) => balls.value)
  }

  get round(): string {
    return this._round.value
  }

  created_at(): Date {
    return this.createdAt.value
  }
}
