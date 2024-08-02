import { Demography } from '@src/contexts/shared/domain/value_objects/Demography'
import { DemographyDto } from '@src/contexts/shared/domain/interfaces/DemographyDto'
import { Entity } from '@contexts/shared/domain/Entity'
import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError'
import { Uuid } from '@contexts/shared/domain/value_objects/Uuid'
import { Maybe } from '@contexts/shared/domain/Maybe'
import { CLubDto } from './interfaces/club/CLubDto'
import { UpdateClubRequest } from '../application/updateClub/UpdateClubRequest'

export class Club extends Entity {
  private _recorders: Maybe<Uuid[]>
  private _demography: Demography
  private _balance: number
  constructor({ id, demography, balance, recorders }: CLubDto) {
    super({ id })
    this._demography = demography
    this._recorders = recorders
    this._balance = balance
  }
  static create({ id, demographyDto }: { id: string; demographyDto: DemographyDto }): Club {
    const demography = new Demography(demographyDto)

    const club = new Club({ id, demography, balance: 0, recorders: Maybe.none() })

    return club
  }

  get demography(): Demography {
    return this._demography
  }

  get recorders(): Maybe<Uuid[]> {
    return this._recorders.map((recorders) => recorders)
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

  public update(request: UpdateClubRequest): void {
    this._demography = new Demography(request)
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
