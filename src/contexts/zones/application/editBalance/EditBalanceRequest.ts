import { OperationType } from "@contexts/zones/domain/interfaces/zone/Types"

export interface EditBalanceRequest {
  zoneId: string
  newBalance: number
  operation: OperationType
  clubId?: string
}