import { UserName } from './value_objects/user/UserName'
import { UserDto } from './interfaces/user/UserDto'
import { UserPassword } from './value_objects/user/UserPassword'
import { AggregateRoot } from '@contexts/shared/domain/AggregateRoot'

export class User extends AggregateRoot {
  private _name: UserName
  private _password: UserPassword

  constructor({ id, name,password }: { id: string; name: UserName, password: UserPassword }) {
    super({ id })
    this._name = name
    this._password = password
  }

  static create({ id, name,password }: UserDto): User {
    const user = new User({ id, name: new UserName(name), password: new UserPassword(password) })

    return user
  }

  get name(): string {
    return this._name.value
  }
  get password(): string {
    return this._password.value
  }

  toPrimitives(): unknown {
    return {
      id: this.id,
      name: this._name.value,
      password: this._password.value
    }
  }
}

