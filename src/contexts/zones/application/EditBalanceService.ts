import { Service } from 'diod'
import { ZoneRepository } from '../domain/contracts/ZoneRepository'

@Service()
export class EditBalanceService {
  constructor(private readonly repository: ZoneRepository) {}

  async handle({
    idZone,
    newBalance,
    isAdd,
    idClub = ''
  }: {
    idZone: string
    newBalance: number
    idClub: string
    isAdd: boolean
  }): Promise<void> {
    const zone = await this.repository.getFindbyId(idZone)
    if (zone == null) throw new Error(`Zone with id ${idZone} not found`)

    zone.editBalance(newBalance, isAdd, idClub)

    await this.repository.saveOrUpdate(zone)
  }
}
