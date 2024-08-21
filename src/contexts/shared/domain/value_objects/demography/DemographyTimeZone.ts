import { ValueObject } from "@contexts/shared/domain/value_objects/ValueObject";

export class DemographyTimeZone extends ValueObject<string> {
    constructor(value: string) {
        super(value)
    }
}