import { Service } from 'diod'
import { ZoneRepository } from '../domain/contracts/ZoneRepository'
import { Zone } from '../domain/Zone'
import { ZoneRequest } from '../domain/interfaces/ZoneRequest'

@Service()
export class CreateNewZoneService {
  constructor(private readonly repository: ZoneRepository) {}

  async handle(zoneIn: ZoneRequest): Promise<void> {
    // confirmar logica
    //const zoneByName = await this.repository.getFindbyName(zoneIn.demographyDto.name)

    //if (zoneByName) throw new Error(`Zone with with the name of ${zoneIn.demographyDto.name} already exists`)

    const zone = Zone.create(zoneIn)

    await this.repository.saveOrUpdate(zone)
  }
}
