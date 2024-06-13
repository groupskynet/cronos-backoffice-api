import { Currency } from '@contexts/shared/domain/Money'
import { UserDto } from './UserDto'
import { DemographyDto } from '@contexts/shared/domain/interfaces/DemographyDto'

export interface ZoneRequest {
  currencyIn: Currency
  demographyDto: DemographyDto
  userDto: UserDto
}
