import { Entity } from '@contexts/shared/domain/Entity'
import { UserName } from './value_objects/user/UserName'
import { UserDto } from './interfaces/UserDto'

export class User extends Entity {
  private _name: UserName

  constructor({ id, name }: { id: string; name: UserName }) {
    super({ id })
    this._name = name
  }

  static create({ id, name }: UserDto): User {
    const user = new User({ id, name: new UserName(name) })

    return user
  }

  get name(): string {
    return this._name.value
  }

  toPrimitives(): unknown {
    return {
      id: this.id,
      name: this._name.value
    }
  }
}

