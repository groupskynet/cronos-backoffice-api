import { Service } from "diod"
import { ZoneRepository } from "@contexts/zones/domain/contracts/ZoneRepository"
import { CreateNewClubRequest } from "./CreateNewClubRequest"

@Service()
export class CreateNewClubService{
    constructor(private readonly repository: ZoneRepository
    ){}

    async handle({clubDto, zoneId}:{clubDto: CreateNewClubRequest, zoneId: string} ): Promise<void>{
        // TODO: validar usuario que contenga la zona con jwt
        
        const zone = await this.repository.getFindbyId(zoneId)

        if(zone == null)
            throw new Error(`Zone with id ${zoneId} not found`)

        const club = zone.clubs.get().find((club) => club.id === clubDto.id)

        if(!club) throw new Error(`Club with id ${clubDto.id} exists`)
        
        const clubNameExists = zone.clubs.isEmpty()? null: zone.clubs.get().find((club) => club.demography.name.value === clubDto.demographyDto.name)

        if(clubNameExists) throw new Error(`Club with name ${clubDto.demographyDto.name} already exists in zone`)
            
        zone.addClub(clubDto)
        
        await this.repository.saveOrUpdate(zone)

        //this.event_bus.publish(zone.pullDomainEvents())
    }
}