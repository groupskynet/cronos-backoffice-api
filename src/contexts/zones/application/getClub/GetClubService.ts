import { ZoneRepository } from "@contexts/zones/domain/contracts/ZoneRepository"
import { Service } from "diod"
import { GetClubResponse } from "./GetClubResponse"

@Service()
export class GetClubService {

    constructor(private readonly repository: ZoneRepository
    ){}

    async handle(id: string, zoneId: string): Promise<GetClubResponse> {

        const zone = await this.repository.getFindbyId(zoneId)

        if(!zone)
            throw new Error(`Zone with id ${zoneId} not found`)
        
        const club = zone.clubs.isEmpty()? null: zone.clubs.get().find((club) => club.id === id)

        if(!club)
            throw new Error(`Club with id ${id} not found`)
        
        return {
            id: club.id,
            name: club.demography.name.value,
            address: club.demography.address.value,
            timeZone: club.demography.timeZone.value
        }
    }

}