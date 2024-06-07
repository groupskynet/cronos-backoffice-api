
import { Demography } from "@src/contexts/shared/domain/value_objects/Demography"
import { User } from "./User"
import { DemographyDto } from "@src/contexts/shared/domain/interfaces/DemographyDto"
import { Entity } from "@contexts/shared/domain/Entity"
import { InvalidArgumentError } from "@contexts/shared/domain/exceptions/InvalidArgumentError"


export class Club extends Entity{
    private _recorders: User[]
    private _demography: Demography
    private _balance: number
    constructor({id,demography}: {id: string, demography: Demography}) {
        super({id})
        this._demography = demography
        this._recorders = []
        this._balance = 0
    }
    static create({demographyDto}:{demographyDto:DemographyDto}): Club{

        const demography = new Demography(demographyDto)

        const club = new Club({id: demographyDto.id,demography})
        
        return club
    }

    get demography(): Demography{
        return this._demography
    }

    get recorders(): User[]{
        return this._recorders
    }

    public addBalance(newBalance: number): void{
        this._balance += newBalance
    }
    public substractBalance(newBalance: number): void{
        if((this._balance - newBalance) < 0) throw new InvalidArgumentError(`The club balance cannot be negative`)
        this._balance -= newBalance
    }
}

