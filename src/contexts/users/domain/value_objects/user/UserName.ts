import { InvalidArgumentError } from "@src/contexts/shared/domain/exceptions/InvalidArgumentError"
import { ValueObject } from "@src/contexts/shared/domain/value_objects/ValueObject"

export class UserName extends ValueObject<string>{

    constructor(value: string){
        super(value)
        this.hasAcceptedLength(value)
    }

    private hasAcceptedLength(value: string): void{
        if(value.length < 8 || value.length > 12 ) throw new InvalidArgumentError("It must be a minimum of 8 and a maximum of 12 characters")
    }
}