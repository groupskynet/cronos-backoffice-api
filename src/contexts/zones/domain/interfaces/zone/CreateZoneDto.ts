import { Maybe } from '@contexts/shared/domain/Maybe'
import { Currency } from '@contexts/shared/domain/Money'
import { DemographyDto } from '@contexts/shared/domain/interfaces/DemographyDto'
import { Club } from '../../Club'

export interface CreateZoneDto {
  currencyIn: Currency
  demographyDto: DemographyDto
  userId: string;
  clubs: Maybe<Club[]>
}
