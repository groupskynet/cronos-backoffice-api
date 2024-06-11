import { DemographyDto } from "@contexts/shared/domain/interfaces/DemographyDto"
import { ZoneRepository } from "../domain/contracts/ZoneRepository"
import { EventBus } from '@contexts/shared/domain/event/EventBus'
import { Service } from "diod"

@Service()
export class CreateNewClubService{
    constructor(private readonly repository: ZoneRepository,
        private readonly event_bus: EventBus
    ){}

    async handle({clubDto, zoneId}:{clubDto: {id: string,demographyDto: DemographyDto}, zoneId: string} ): Promise<void>{
        // TODO: validar usuario que contenga la zona con jwt
        
        const zone = await this.repository.getFindbyId(zoneId)

        if(zone == null)
            throw new Error(`Zone with id ${zoneId} not found`)

        zone.addClub(clubDto)

        await this.repository.saveOrUpdate(zone)

        this.event_bus.publish(zone.pullDomainEvents())
    }
}