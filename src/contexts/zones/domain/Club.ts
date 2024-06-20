import { Demography } from '@src/contexts/shared/domain/value_objects/Demography'
import { DemographyDto } from '@src/contexts/shared/domain/interfaces/DemographyDto'
import { Entity } from '@contexts/shared/domain/Entity'
import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError'
import { Uuid } from '@contexts/shared/domain/value_objects/Uuid'

export class Club extends Entity {
  private _recorders: Uuid[]
  private _demography: Demography
  private _balance: number
  constructor({ id, demography }: { id: string; demography: Demography }) {
    super({ id })
    this._demography = demography
    this._recorders = []
    this._balance = 0
  }
  static create({ id, demographyDto }: { id: string; demographyDto: DemographyDto }): Club {
    const demography = new Demography(demographyDto)

    const club = new Club({ id, demography })

    return club
  }

  get demography(): Demography {
    return this._demography
  }

  get recorders(): string[] {
    return this._recorders.map((recorder) => recorder.value)
  }

  get balance(): number {
    return this._balance
  }
  public addBalance(newBalance: number): void {
    this._balance += newBalance
  }
  public substractBalance(newBalance: number): void {
    if (this._balance - newBalance < 0) throw new InvalidArgumentError(`The club balance cannot be negative`)
    this._balance -= newBalance
  }

  toPrimitives(): unknown {
    return {
      id: this.id,
      demography: this._demography.toPrimitives(),
      recorders: this._recorders,
      balance: this._balance
    }
  }
}
