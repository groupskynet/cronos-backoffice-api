import { Demography } from '@src/contexts/shared/domain/value_objects/Demography'
import { Club } from './Club'
import { ZoneCurrency } from './value_objects/zone/ZoneCurrency'
import { ZoneDto } from './interfaces/zone/ZoneDto'
import { DemographyDto } from '@contexts/shared/domain/interfaces/DemographyDto'
import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError'
import { AggregateRoot } from '@contexts/shared/domain/AggregateRoot'
import { Maybe } from '@contexts/shared/domain/Maybe'
import { Uuid } from '@contexts/shared/domain/value_objects/Uuid'
import { CreateZoneDto } from './interfaces/zone/CreateZoneDto'

export class Zone extends AggregateRoot {
  private _currency: ZoneCurrency
  private _balance: number
  private _userId: Uuid
  private _clubs: Maybe<Club[]>
  private _demography: Demography

  constructor({ id, currency, demography, userId, clubs, balance }: ZoneDto) {
    super({ id })
    this._currency = currency
    this._demography = demography
    this._clubs = clubs
    this._balance = balance
    this._userId = userId
  }

  static create({ id, request }: { request: CreateZoneDto; id: string }): Zone {
    const { demographyDto, userId, currencyIn, clubs } = request
    const demography = new Demography(demographyDto)
    const currency = new ZoneCurrency(currencyIn)

    const zone = new Zone(
      { id,
        demography,
        userId: new Uuid(userId),
        currency,
        clubs: clubs,
        balance: 0
      }
    )

    return zone
  }

  get demography(): Demography {
    return this._demography
  }
  get currency(): string {
    return this._currency.value
  }
  get userId(): string {
    return this._userId.value
  }
  get balance(): number {
    return this._balance
  }
  get clubs(): Maybe<Club[]> {
    return this._clubs.map((clubs) => clubs)
  }

  public addClub({ id, demographyDto }: { id: string; demographyDto: DemographyDto }): void {
    const clubExist = this.clubs.get().find((x) => x.demography.name.value === demographyDto.name)

    if (clubExist) throw new InvalidArgumentError(`The area already has a club with this name ${demographyDto.name}`)

    const club = Club.create({ id, demographyDto })

    const newClubs = this._clubs.get().filter((x) => x.id !== id)

    newClubs.push(club)

    this._clubs = Maybe.some(newClubs)
  }

  public editBalance(newBalance: number, isAdd: boolean, clubId: string = ''): void {
    if (newBalance <= 0) throw new InvalidArgumentError(`The new balance incorrect, must be positive`)

    if (isAdd && clubId && this._balance - newBalance < 0)
      throw new InvalidArgumentError(`The balance of the zone cannot be negative`)

    if (clubId) {
      this.editBalanceClub(newBalance, isAdd, clubId)
    } else {
      if (isAdd) {
        this._balance += newBalance
      } else {
        this._balance -= newBalance
      }
    }
  }

  private editBalanceClub(newBalance: number, isAdd: boolean, clubId: string) {
    const club = this._clubs.get().find((x) => x.id === clubId)

    if (!club) throw new InvalidArgumentError(`Club ${clubId} was not found`)

    if (isAdd) {
      club.addBalance(newBalance)
    } else {
      club.substractBalance(newBalance)
    }

    const newClubs = this._clubs.get().filter((x) => x.id !== clubId)
    newClubs.push(club)
    this._clubs = Maybe.some(newClubs)

    this.editBalance(newBalance, !isAdd)
  }

  toPrimitives(): unknown {
    return {
      id: this.id,
      currency: this.currency,
      demography: this.demography.toPrimitives(),
      userId: this.userId,
      clubs: !this.clubs.isEmpty()? this.clubs.get().map((club) => club.toPrimitives()): Maybe.none()
    }
  }
}
