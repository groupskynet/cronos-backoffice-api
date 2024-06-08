import { Demography } from '@src/contexts/shared/domain/value_objects/Demography'
import { ZoneCurrency } from '../value_objects/zone/ZoneCurrency'
import { User } from '../User'

export interface ZoneDto {
  id: string
  currency: ZoneCurrency
  demography: Demography
  user: User
}

