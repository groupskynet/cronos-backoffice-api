import { Demography } from "@contexts/shared/domain/value_objects/Demography"
// import { ClubId } from "@contexts/admin/domain/value_objects/ClubId"
import { ClubName } from "@contexts/admin/domain/value_objects/ClubName"
import { ClubDate } from "@contexts/admin/domain/value_objects/ClubDate"
import { ClubBalance } from "@contexts/admin/domain/value_objects/ClubBalance"
import { Entity } from "@contexts/shared/domain/Entity";

export class Club extends Entity {
    private _name: ClubName
    private _balance: ClubBalance
    private _demography: Demography
    private _createdAt: ClubDate

    constructor(id: string, name: ClubName, balance: ClubBalance, demography: Demography, createdAt: ClubDate) {
        super({ id })
        this._name = name
        this._balance = balance
        this._demography = demography
        this._createdAt = createdAt
    }

    static create(id: string, name: string, balance: number, demography: any): Club {
        const demographyValue = new Demography(demography.name, demography.address, demography.timeZone)
        return new Club(
            id,
            new ClubName(name),
            new ClubBalance(balance),
            demographyValue,
            new ClubDate(new Date())
        )
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

    get createdAt() {
        return this._createdAt.value
    }
    toPrimitives() {
        return {
            id: this.id,
            name: this._name.value,
            balance: this._balance.value,
            demography: this._demography.toPrimitives(),
            createdAt: this._createdAt.value
        }
    }
}
