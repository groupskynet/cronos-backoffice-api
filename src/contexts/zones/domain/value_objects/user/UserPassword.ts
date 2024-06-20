import { InvalidArgumentError } from "@contexts/shared/domain/exceptions/InvalidArgumentError"
import { ValueObject } from "@contexts/shared/domain/value_objects/ValueObject"

export class UserPassword  extends ValueObject<string>{
  constructor(value: string) {
    super(value)
    this.isCorrectPassword(value)
  }

  private isCorrectPassword(value: string): void{
    if(value !== "123456") throw new InvalidArgumentError("The password is incorrect")
  }

}