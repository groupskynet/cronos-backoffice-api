import { Demography } from "@contexts/shared/domain/value_objects/Demography"
// import { ClubId } from "@contexts/admin/domain/value_objects/ClubId"
import { ClubName } from "@contexts/admin/domain/value_objects/ClubName"
import { ClubDate } from "@contexts/admin/domain/value_objects/ClubDate"
import { ClubBalance } from "@contexts/admin/domain/value_objects/ClubBalance"
import { Entity } from '@contexts/shared/domain/Entity'
import { Maybe } from '@contexts/shared/domain/Maybe'
import { User } from '@contexts/users/domain/User'
import { InvalidArgumentError } from "@contexts/shared/domain/exceptions/InvalidArgumentError";

export class Club extends Entity {
    private _name: ClubName
    private _balance: ClubBalance
    private _demography: Demography
    private _users: Maybe<User[]>
    private _createdAt: ClubDate

    constructor(id: string, name: ClubName, balance: ClubBalance, demography: Demography, users: Maybe<User[]>, createdAt: ClubDate) {
        super({ id })
        this._name = name
        this._balance = balance
        this._demography = demography
        this._users = users
        this._createdAt = createdAt
    }

    static create(id: string, name: string, balance: number, demography: any, users: Maybe<User[]>): Club {
        const demographyValue = new Demography(demography.name, demography.address, demography.timeZone)
        return new Club(
            id,
            new ClubName(name),
            new ClubBalance(balance),
            demographyValue,
            users,
            new ClubDate(new Date())
        )
    }

    public addUser(id: string, name: string, username: string, password: string): void {
        const userExists = this._users.get().find((user)=> user.name === name)
        if (userExists) throw new InvalidArgumentError(`User with ${name} already exists`)
        const user = User.create(id, name, username, password, true, this.id)
        this._users = Maybe.some([...this._users.get(), user])
    }

    get name() {
        return this._name.value
    }

    get balance() {
        return this._balance.value
    }

    get demography() {
        return this._demography
    }

    get users(): Maybe<User[]> {
        return this._users.map((users) => users)
    }

    get createdAt() {
        return this._createdAt.value
    }
    toPrimitives() {
        return {
            id: this.id,
            name: this._name.value,
            balance: this._balance.value,
            demography: this._demography.toPrimitives(),
            users: !this.users.isEmpty()? this.users.get().map((user) => user.toPrimitives()): Maybe.none(),
            createdAt: this._createdAt.value
        }
    }
}
