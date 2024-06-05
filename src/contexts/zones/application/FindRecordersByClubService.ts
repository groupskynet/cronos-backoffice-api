import { Service } from "diod"
import { ZoneRepository } from "../domain/contracts/ZoneRepository"
import { User } from "../domain/User"

@Service()
export class FindRecordersByClubService{
    constructor(private readonly repository: ZoneRepository
    ){}

    async handle({idZone, idClub}: {idZone: string, idClub: string}): Promise<User[]>{
        const zone = await this.repository.getFindbyId(idZone)
        if(zone == null)
            throw new Error(`Zone with id ${idZone} not found`)

        const club = zone.clubs.find( x => x.id === idClub)
        if(club == null)
            throw new Error(`Club with id ${idClub} not found`)

        return club.recorders
    }

}