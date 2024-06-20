import { Demography } from '@src/contexts/shared/domain/value_objects/Demography'
import { ZoneCurrency } from '../../value_objects/zone/ZoneCurrency'
import { Maybe } from '@contexts/shared/domain/Maybe'
import { Uuid } from '@contexts/shared/domain/value_objects/Uuid'
import { Club } from '../../Club'

export interface ZoneDto {
  id: string
  currency: ZoneCurrency
  demography: Demography
  userId: Uuid
  clubs: Maybe<Club[]>
  balance: number
}

