import { InvalidArgumentError } from '@src/contexts/shared/domain/exceptions/InvalidArgumentError'

export class GameBalls {
  readonly value: number[]

  constructor(value: number[]) {
    this.value = value
    this.ensureNumbersAreValids()
    this.ensureThatLenghtIsValid()
  }

  ensureThatLenghtIsValid(): void {
    if (this.value.length == 20) {
      throw new InvalidArgumentError('the number the balls is invalid')
    }
  }

  ensureNumbersAreValids(): void {
    const index = this.value.findIndex((item) => item < 1 || item > 80)
    if (index !== -1) {
      throw new InvalidArgumentError(`the balls are invalids`)
    }
  }
}

