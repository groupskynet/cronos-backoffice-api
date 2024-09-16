import { Service } from 'diod'
import { CreateUserCommand } from '@contexts/users/application/create/CreateUserCommand'
import { ClubRepository } from '@contexts/admin/domain/contracts/ClubRepository'
import { ClubId } from '@contexts/admin/domain/value_objects/ClubId'
import { InvalidArgumentError } from "@contexts/shared/domain/exceptions/InvalidArgumentError";
import { AdminId } from "@contexts/admin/domain/value_objects/AdminId";

@Service()
export class CreateUserService {
    constructor(
        private readonly repository: ClubRepository,
        // private readonly event_bus: EventBus
    ) {}

    async handle(command: CreateUserCommand): Promise<void> {
        const club = await this.repository.findById(new ClubId(command.clubId))
        if (!club) throw new InvalidArgumentError(`Club with ${command.clubId} not found`)
        const user = club.users.get().find((user)=> user.id === command.id)
        if (user) throw new InvalidArgumentError(`User with ${command.id} already exists`)
        const userNameExists = !club.users.isEmpty() ? null : club.users.get().find((user)=> user.name === command.name)
        if (userNameExists) throw new InvalidArgumentError(`User with ${command.name} already exists`)

        club.addUser(command.id, command.name, command.username, command.password)

        await this.repository.update(club, new AdminId(command.adminId))
        // this.event_bus.publish(club.pullDomainEvents())
    }
}