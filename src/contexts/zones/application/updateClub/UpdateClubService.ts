import { ZoneRepository } from "@contexts/zones/domain/contracts/ZoneRepository"
import { Service } from "diod"
import { UpdateClubRequest } from "./UpdateClubRequest"

@Service()
export class UpdateClubService{
    constructor(private  readonly repository: ZoneRepository){}
    
    async handle(id: string, request: UpdateClubRequest): Promise<void>{
        const zone = await this.repository.getFindbyId(request.zoneId)
        
        if(zone == null) throw new Error(`Zone with id ${request.zoneId} not found`)
        
        zone.updateClub(id, request)
         
        await this.repository.saveOrUpdate(zone)
    }
}