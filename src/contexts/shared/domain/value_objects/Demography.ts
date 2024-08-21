import { DemographyName} from "@contexts/shared/domain/value_objects/demography/DemographyName";
import { DemographyAddress} from "@contexts/shared/domain/value_objects/demography/DemographyAddress";
import { DemographyTimeZone} from "@contexts/shared/domain/value_objects/demography/DemographyTimeZone";

export class Demography {
    readonly _name: DemographyName
    readonly _address: DemographyAddress
    readonly _timeZone: DemographyTimeZone

    constructor(name: string, address: string, timeZone: string) {
        this._name = new DemographyName(name)
        this._address = new DemographyAddress(address)
        this._timeZone = new DemographyTimeZone(timeZone)
    }
    toPrimitives(): unknown {
        return {
            name: this._name.value,
            address: this._address.value,
            timeZone: this._timeZone.value
        }
    }
}