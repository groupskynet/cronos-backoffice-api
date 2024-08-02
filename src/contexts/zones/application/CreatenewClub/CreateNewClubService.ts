import { Service } from "diod"
import { ZoneRepository } from "@contexts/zones/domain/contracts/ZoneRepository"
import { CreateNewClubRequest } from "./CreateNewClubRequest"

@Service()
export class CreateNewClubService{
    constructor(private readonly repository: ZoneRepository
    ){}

    async handle({clubDto, id}:{clubDto: CreateNewClubRequest, id: string} ): Promise<void>{
        // TODO: validar usuario que contenga la zona con jwt
        
        const zone = await this.repository.getFindbyId(clubDto.zoneId)

        if(zone == null)
            throw new Error(`Zone with id ${clubDto.zoneId} not found`)

        const club = zone.clubs.get().find((club) => club.id === id)

        if(club) throw new Error(`Club with id ${id} exists`)
        
        const clubNameExists = zone.clubs.isEmpty()? null: zone.clubs.get().find((club) => club.demography.name.value === clubDto.name)

        if(clubNameExists) throw new Error(`Club with name ${clubDto.name} already exists in zone`)
            
        zone.addClub({id: id, demographyDto: {name: clubDto.name, address: clubDto.address, timeZone: clubDto.timeZone}})
        
        await this.repository.saveOrUpdate(zone)

        //this.event_bus.publish(zone.pullDomainEvents())
    }
}