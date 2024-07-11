import { ZoneRepository } from "@contexts/zones/domain/contracts/ZoneRepository"
import { Service } from "diod"

@Service()
export class UpdateBalanceTicketCreateService {
    
    constructor(private readonly zoneRepository: ZoneRepository){}

    async handle({clubId, bets}:{clubId: string, bets: {
        betId: string,
        nums: number[],
        amount: number,
        dateBets: Date,
    }[]}): Promise<void>{
        
        const zone = await this.zoneRepository.getZoneByClubId(clubId)
        if(!zone) throw new Error('Zone not found')

        if(!bets || bets.length <= 0) throw new Error('Bets not found')

        const balance = bets.reduce((acc, bet) => acc + bet.amount, 0)

        zone.editBalance(balance,true,clubId)

        await this.zoneRepository.saveOrUpdate(zone)

    }
}