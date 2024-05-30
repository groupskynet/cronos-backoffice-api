import { DemographyDto } from '../interfaces/DemographyDto'
import { DemographyAddress } from './demography/DemographyAddress'
import { DemographyBalance } from './demography/DemographyBalance'
import { DemographyName } from './demography/DemographyName'
import { DemographyTimeZone } from './demography/DemographyTimeZone'

export class Demography {
   name: DemographyName
   balance: DemographyBalance
   address: DemographyAddress
   timeZone: DemographyTimeZone
  constructor({ name, address, timeZone, balance }: DemographyDto) {
    this.name = new DemographyName(name)
    this.balance = new DemographyBalance(balance)
    this.address = new DemographyAddress(address)
    this.timeZone = new DemographyTimeZone(timeZone)
  }
}
