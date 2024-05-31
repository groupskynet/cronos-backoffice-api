
import { Demography } from "@src/contexts/shared/domain/value_objects/Demography"
import { User } from "./User"
import { DemographyDto } from "@src/contexts/shared/domain/interfaces/DemographyDto"
import { Entity } from "@contexts/shared/domain/Entity"


export class Club extends Entity{
    private _recorders: User[]
    private _demography: Demography
    constructor({id,demography}: {id: string, demography: Demography}) {
        super({id})
        this._demography = demography
        this._recorders = []
    }
    static cereate({demographyDto}:{demographyDto:DemographyDto}): Club{

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
}

