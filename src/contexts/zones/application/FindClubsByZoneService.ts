import { Service } from "diod"
import { ZoneRepository } from "../domain/contracts/ZoneRepository"
import { Club } from "../domain/Club"

@Service()
export class FindClubsByZoneService{

    constructor(private readonly repository: ZoneRepository
    ){}

    async handle(id: string): Promise<Club[]>{
        const zone = await this.repository.getFindbyId(id)

        if(zone == null)
            throw new Error(`Zone with id ${id} not found`)

        return zone.clubs
    }
}