import { Service } from "diod"
import { ZoneRepository } from "../../domain/contracts/ZoneRepository"
import { FindClubsByZoneResponse } from "./FindClubsByZoneResponse"

@Service()
export class FindClubsByZoneService{

    constructor(private readonly repository: ZoneRepository
    ){}

    async handle(id: string): Promise<FindClubsByZoneResponse>{
        const zone = await this.repository.getFindbyId(id)

        if(zone == null)
            throw new Error(`Zone with id ${id} not found`)

        const response: FindClubsByZoneResponse = {
            zoneId: zone.id,
            clubs: []
        }

        if(!zone.clubs.isEmpty())
        {
            zone.clubs.get().forEach((club) => {
                response.clubs.push({
                    id: club.id,
                    name: club.demography.name.value,
                    address: club.demography.address.value,
                    balance: club.balance,
                    timeZone: club.demography.timeZone.value
                })
            })
        }

        return response
    }
}