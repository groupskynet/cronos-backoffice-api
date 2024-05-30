
import { Demography } from "@src/contexts/shared/domain/value_objects/Demography"
import { User } from "./User"
import { DemographyDto } from "@src/contexts/shared/domain/interfaces/DemographyDto"


export class Club{
    private _recorders: User[]
    private _demography: Demography
    constructor({demography}: {demography: Demography}) {
        this._demography = demography
        this._recorders = []
    }
    static cereate({demographyDto}:{demographyDto:DemographyDto}): Club{

        const demography = new Demography(demographyDto)

        const club = new Club({demography})
        
        return club
    }

    public addRecorder(recorderName: string){
        const recorder = User.create(recorderName)
        this._recorders.push(recorder)
    }

    get demography(): Demography{
        return this._demography
    }

    get recorders(): User[]{
        return this._recorders
    }
}

