import { Currency } from '@contexts/shared/domain/Money'
import { UserDto } from './UserDto'
import { DemographyDto } from '@contexts/shared/domain/interfaces/DemographyDto'

export interface ZoneRequest {
  id: string
  currencyIn: Currency
  demographyDto: DemographyDto
  userDto: UserDto
}
