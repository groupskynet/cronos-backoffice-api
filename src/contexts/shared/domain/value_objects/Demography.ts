import { DemographyDto } from '../interfaces/DemographyDto'
import { DemographyAddress } from './demography/DemographyAddress'
import { DemographyName } from './demography/DemographyName'
import { DemographyTimeZone } from './demography/DemographyTimeZone'

export class Demography {
   readonly name: DemographyName
   readonly address: DemographyAddress
   readonly timeZone: DemographyTimeZone
  constructor({ name, address, timeZone }: DemographyDto) {
    this.name = new DemographyName(name)
    this.address = new DemographyAddress(address)
    this.timeZone = new DemographyTimeZone(timeZone)
  }


}
