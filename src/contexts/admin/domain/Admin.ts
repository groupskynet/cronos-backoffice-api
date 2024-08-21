import { AggregateRoot } from '@contexts/shared/domain/AggregateRoot'
import { AdminId } from '@contexts/admin/domain/value_objects/AdminId'
import { AdminName} from '@contexts/admin/domain/value_objects/AdminName'
import { AdminBalance } from '@contexts/admin/domain/value_objects/AdminBalance'
import { AdminPercentage } from '@contexts/admin/domain/value_objects/AdminPercentage'
import { AdminUsername } from '@contexts/admin/domain/value_objects/AdminUsername'
import { AdminPassword } from '@contexts/admin/domain/value_objects/AdminPassword'
import { AdminDate } from '@contexts/admin/domain/value_objects/AdminDate'
import { Club } from '@contexts/admin/domain/entity/Club'
import {Maybe} from "@contexts/shared/domain/Maybe";
import {InvalidArgumentError} from "@contexts/shared/domain/exceptions/InvalidArgumentError";

export class Admin extends AggregateRoot {
  private _id: AdminId
  private _name: AdminName
  private _balance: AdminBalance
  private _percentage: AdminPercentage
  private _username: AdminUsername
  private _password: AdminPassword
  private _clubs: Maybe<Club[]>
  private _createdAt: AdminDate

  constructor(
    id: AdminId,
    name: AdminName,
    balance: AdminBalance,
    percentage: AdminPercentage,
    username: AdminUsername,
    password: AdminPassword,
    clubs: Maybe<Club[]>,
    createdAt: AdminDate,
  ) {
    super()
    this._id = id
    this._name = name
    this._balance = balance
    this._percentage = percentage
    this._username = username
    this._password = password
    this._clubs = clubs
    this._createdAt = createdAt

  }

  static create(id: string, name: string, balance: number, percentage: number, username: string, password: string, clubs: Maybe<Club[]>): Admin {
    return new Admin(
      new AdminId(id),
      new AdminName(name),
      new AdminBalance(balance),
      new AdminPercentage(percentage),
      new AdminUsername(username),
      new AdminPassword(password),
      clubs,
      new AdminDate(new Date()))
  }

  toPrimitives() {
    return {
      id: this._id.value,
      name: this._name.value,
      balance: this._balance.value,
      percentage: this._percentage.value,
      username: this._username.value,
      password: this._password.value,
      clubs: !this.clubs.isEmpty()? this.clubs.get().map((club) => club.toPrimitives()): Maybe.none(),
      createdAt: this._createdAt.value
    }
  }

  public addClub(id: string, name: string, balance: number, demography: any): void {
    const clubExists = this._clubs.get().find((club)=> club.name === name)
    if (clubExists) throw new InvalidArgumentError(`Club with ${name} already exists`)
    const club = Club.create(id, name, balance, demography)
    this._clubs = Maybe.some([...this._clubs.get(), club])
  }

  get id(): string {
    return this._id.value
  }

  get name(): string {
    return this._name.value
  }

  get balance(): number {
    return this._balance.value
  }

  get percentage(): number {
    return this._percentage.value
  }

  get username(): string {
    return this._username.value
  }

  get password(): string {
    return this._password.value
  }

  get createdAt(): Date {
    return this._createdAt.value
  }

  get clubs(): Maybe<Club[]> {
    return this._clubs.map((clubs) => clubs)
  }


}