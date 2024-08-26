import { InvalidArgumentError } from "../../exceptions/InvalidArgumentError"
import { ValueObject } from "../ValueObject"

export class DemographyAddress extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.ensureIsValid(value)
  }

  private ensureIsValid(value: string): void {
    if (value.length < 12) throw new InvalidArgumentError('Must be at least 12 characters')
  }
}