import { InvalidArgumentError } from '../../exceptions/InvalidArgumentError'
import { ValueObject } from '../ValueObject'

export class DemographyName extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.hasMinLength(value)
  }

  private hasMinLength(value: string): void {
    if (value.length < 8) throw new InvalidArgumentError('Must be at least 8 characters')
  }
}

