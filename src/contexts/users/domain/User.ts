import { AggregateRoot } from '@contexts/shared/domain/AggregateRoot'
import { UserId } from '@contexts/users/domain/value_objects/UserId'
import { UserName } from '@contexts/users/domain/value_objects/UserName'
import { UserUsername} from '@contexts/users/domain/value_objects/UserUsername'
import { UserPassword } from '@contexts/users/domain/value_objects/UserPassword'
import { UserEnabled } from '@contexts/users/domain/value_objects/UserEnabled'
import { UserDate } from '@contexts/users/domain/value_objects/UserDate'
import { ClubId } from '@contexts/admin/domain/value_objects/ClubId'

export class User extends AggregateRoot {
    private _id: UserId
    private _name: UserName
    private _username: UserUsername
    private _password: UserPassword
    private _enabled: UserEnabled
    private _clubId: ClubId
    private _createdAt: UserDate

    constructor(
        id: UserId,
        name: UserName,
        username: UserUsername,
        password: UserPassword,
        enabled: UserEnabled,
        clubId: ClubId,
        createdAt: UserDate
    ) {
        super()
        this._id = id
        this._name = name
        this._username = username
        this._password = password
        this._enabled = enabled
        this._clubId = clubId
        this._createdAt = createdAt
    }

    static create(id: string, name: string, username: string, password: string, enabled: boolean, clubId: string): User {
        return new User(
            new UserId(id),
            new UserName(name),
            new UserUsername(username),
            new UserPassword(password),
            new UserEnabled(enabled),
            new ClubId(clubId),
            new UserDate(new Date()))
    }

    toPrimitives() {
        return {
            id: this._id.value,
            name: this._name.value,
            username: this._username.value,
            password: this._password.value,
            enabled: this._enabled.value,
            clubId: this._clubId.value,
            createdAt: this._createdAt.value
        }
    }

    get id(): string {
        return this._id.value
    }

    get name(): string {
        return this._name.value
    }

    get username(): string {
        return this._username.value
    }

    get password(): string {
        return this._password.value
    }

    get enabled(): boolean {
        return this._enabled.value
    }

    get clubId(): string {
        return this._clubId.value
    }

    get createdAt(): Date {
        return this._createdAt.value
    }
}