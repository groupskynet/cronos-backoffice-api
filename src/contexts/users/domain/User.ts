import { AggregateRoot } from '@contexts/shared/domain/AggregateRoot'
import { UserName } from './value_objects/user/UserName'
import { UserPassword } from './value_objects/user/UserPassword'
import { UserDto } from './interfaces/user/UserDto'
import { UserCreateOrUpdateDto } from './interfaces/user/UserCreateOrUpdateDto'

export class User extends AggregateRoot {
  private _name: UserName
  private _password: UserPassword
  private _enabled: boolean

  constructor({ id, name,password, enabled }: UserDto) {
    super({ id })
    this._name = name
    this._password = password
    this._enabled = enabled
  }

  static createOrUpdate({ id, name,password, enabled }: UserCreateOrUpdateDto): User {
    const user = new User({ id, name: new UserName(name), password: new UserPassword(password),enabled })
    return user
  }

  get name(): string {
    return this._name.value
  }
  get password(): string {
    return this._password.value
  }
  get enabled(): boolean {
    return this._enabled
  }

  toPrimitives(): unknown {
    return {
      id: this.id,
      name: this._name.value,
      password: this._password.value
    }
  }
}

