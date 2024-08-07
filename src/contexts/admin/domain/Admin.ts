import { AggregateRoot } from '@contexts/shared/domain/AggregateRoot'
import { AdminId } from '@contexts/admin/domain/value_objects/AdminId'
import { AdminName} from '@contexts/admin/domain/value_objects/AdminName'
import { AdminBalance } from '@contexts/admin/domain/value_objects/AdminBalance'
import { AdminPercentage } from '@contexts/admin/domain/value_objects/AdminPercentage'
import { AdminUsername } from '@contexts/admin/domain/value_objects/AdminUsername'
import { AdminPassword } from '@contexts/admin/domain/value_objects/AdminPassword'
import { AdminDate } from '@contexts/admin/domain/value_objects/AdminDate'

export class Admin extends AggregateRoot {
  private _id: AdminId
  private _name: AdminName
  private _balance: AdminBalance
  private _percentage: AdminPercentage
  private _username: AdminUsername
  private _password: AdminPassword
  private _createdAt: AdminDate

  constructor(
    id: AdminId,
    name: AdminName,
    balance: AdminBalance,
    percentage: AdminPercentage,
    username: AdminUsername,
    password: AdminPassword,
    createdAt: AdminDate,
  ) {
    super()
    this._id = id
    this._name = name
    this._balance = balance
    this._percentage = percentage
    this._username = username
    this._password = password
    this._createdAt = createdAt

  }

  static create(id: string, name: string, balance: number, percentage: number, username: string, password: string): Admin {
    return new Admin(
      new AdminId(id),
      new AdminName(name),
      new AdminBalance(balance),
      new AdminPercentage(percentage),
      new AdminUsername(username),
      new AdminPassword(password),
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
      createdAt: this._createdAt.value
    }
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


}