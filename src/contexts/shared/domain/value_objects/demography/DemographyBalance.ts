import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError"
import { ValueObject } from "../ValueObject"

export class DemographyBalance extends ValueObject<number>{
    
    constructor(value: number){
        super(value)
    }

    ItCanNotBeNegative(value: number = 0): void{
        if(value < 0) throw new InvalidArgumentError("The balance cannot be negative")
    }
}