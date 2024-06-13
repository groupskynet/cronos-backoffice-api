import { Service } from "diod"
import { ZoneRepository } from "../domain/contracts/ZoneRepository"
import { Zone } from "../domain/Zone"

@Service()
export class FindClubsByZoneService{

    constructor(private readonly repository: ZoneRepository
    ){}

    async handle(id: string): Promise<Zone>{
        const zone = await this.repository.getFindbyId(id)

        if(zone == null)
            throw new Error(`Zone with id ${id} not found`)
        console.log({zone})
        return zone
    }
}