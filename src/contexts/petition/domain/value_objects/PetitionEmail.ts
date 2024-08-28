import { StringValueObject } from '@contexts/shared/domain/value_objects/StringValueObject'
import { InvalidArgumentError } from '@contexts/shared/domain/exceptions/InvalidArgumentError'
export class PetitionEmail extends StringValueObject {
    constructor(value: string) {
        super(value)
        this.ensureIsValidEmail(value)

    }

    ensureIsValidEmail(email: string): void {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(email)) {
            throw new InvalidArgumentError('Invalid email')
        }
    }
}