import { Service } from 'diod'
import { CreateClubCommand } from '@contexts/admin/application/commands/createClub/CreateClubCommand'
import { AdminRepository} from "@contexts/admin/domain/contracts/AdminRepository";
import {AdminId} from "@contexts/admin/domain/value_objects/AdminId";

@Service()
export class CreateClubService {
    constructor(
        private readonly repository: AdminRepository,
        // private readonly event_bus: EventBus
    ) {}

    async handle(command: CreateClubCommand): Promise<void> {
        const admin = await this.repository.findById(new AdminId(command.adminId));
        if (!admin) throw new Error(`Admin with ${command.adminId} not found`)
        const club = admin.clubs.get().find((club)=> club.id === command.id)
        if (club) throw new Error(`Club with ${command.id} already exists`)
        const clubNameExists = !admin.clubs.isEmpty() ? null : admin.clubs.get().find((club)=> club.name === command.name)
        if (clubNameExists) throw new Error(`Club with ${command.name} already exists`)


        admin.addClub(command.id, command.name, command.balance, command.demography)


        await this.repository.save(admin)
        // this.event_bus.publish(club.pullDomainEvents())
    }
}
