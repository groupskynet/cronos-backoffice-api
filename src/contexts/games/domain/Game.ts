import { AggregateRoot } from '@contexts/shared/domain/AggregateRoot'
import { GameBalls } from './value_objects/GameBalls'
import { GameDate } from './value_objects/GameDate'
import { GameRound } from './value_objects/GameRound'

export class Game extends AggregateRoot {
  private _balls: GameBalls
  private createdAt: GameDate
  private _round: GameRound
  private _status: 'PENDING' | 'PLAYED'

  constructor(id: string, balls: GameBalls, round: GameRound, createdAt: GameDate, status: 'PENDING' | 'PLAYED') {
    super({id})
    this._balls = balls
    this.createdAt = createdAt
    this._round = round
    this._status = status
  }

  static create(id: string, balls: number[], createdAt: Date, round: string): Game {
    const game = new Game(
      id,
      new GameBalls(balls),
      new GameRound(round),
      new GameDate(createdAt),
      'PENDING'
    )
    return game
  }

  public updateBalls(numbers: number[]): void {
    this._balls = new GameBalls(numbers)
    this._status = 'PLAYED'
  }


  get status(): string {
    return this._status
  }

  get balls(): number[] {
    return this._balls.value
  }

  get round(): string {
    return this._round.value
  }

  created_at(): Date {
    return this.createdAt.value
  }
}
