export interface EditBalanceRequest {
  zoneId: string
  newBalance: number
  isAdd: boolean
  clubId?: string
}