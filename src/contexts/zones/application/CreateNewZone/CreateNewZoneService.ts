import { Service } from 'diod'
import { Maybe } from '@contexts/shared/domain/Maybe'
import { ZoneRepository } from '@contexts/zones/domain/contracts/ZoneRepository'
import { CreateNewZoneRequest } from './CreateNewZoneRequest'
import { Zone } from '@contexts/zones/domain/Zone'

@Service()
export class CreateNewZoneService {
  constructor(private readonly repository: ZoneRepository) {}

  async handle(id: string,request: CreateNewZoneRequest): Promise<void> {
    // confirmar logica
    //const zoneByName = await this.repository.getFindbyName(zoneIn.demographyDto.name)

    //if (zoneByName) throw new Error(`Zone with with the name of ${zoneIn.demographyDto.name} already exists`)

    const zone = Zone.create({id, request: {...request, clubs: Maybe.none()}})

    await this.repository.saveOrUpdate(zone)
  }
}
