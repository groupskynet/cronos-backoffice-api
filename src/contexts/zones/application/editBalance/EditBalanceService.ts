import { ZoneRepository } from '@contexts/zones/domain/contracts/ZoneRepository'
import { Service } from 'diod'
import { EditBalanceRequest } from './EditBalanceRequest'

@Service()
export class EditBalanceService {
  constructor(private readonly repository: ZoneRepository) {}

  async handle({
    zoneId,
    newBalance,
    operation,
    clubId
  }: EditBalanceRequest): Promise<void> {
    const zone = await this.repository.getFindbyId(zoneId)
    if (zone == null) throw new Error(`Zone with id ${zoneId} not found`)
      console.log({club: zone.clubs.get()})
    zone.editBalance(newBalance, operation, clubId)

    await this.repository.saveOrUpdate(zone)
  }
}
