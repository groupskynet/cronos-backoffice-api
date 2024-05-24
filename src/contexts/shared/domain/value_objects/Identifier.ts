import { v4 } from 'uuid'
import { StringValueObject } from './StringValueObject'

export abstract class Identifier extends StringValueObject {
  static generate(): string {
    const uuid = v4()
    const timestamp = Date.now().toString()
    const identifier = `${uuid}${timestamp}`
    const buffer = Buffer.from(identifier)
    const base64 = buffer.toString('base64').replace(/=+$/, '')
    return base64
  }
}
