import { Service } from 'diod'
import { Maybe } from '@contexts/shared/domain/Maybe'
import { ZoneRepository } from '@contexts/zones/domain/contracts/ZoneRepository'
import { Zone } from '@contexts/zones/domain/Zone'
import { CreateNewZoneRequest } from './CreateNewZoneRequest'

@Service()
export class CreateNewZoneService {
  constructor(private readonly repository: ZoneRepository) {}

  async handle(id: string,request: CreateNewZoneRequest): Promise<void> {
    
    const zoneByName = await this.repository.getFindbyName(request.demographyDto.name)

    if (zoneByName) throw new Error(`Zone with with the name of ${request.demographyDto.name} already exists`)

    const zone = Zone.create({id, request: {...request, clubs: Maybe.none()}})

    await this.repository.saveOrUpdate(zone)
  }
}
