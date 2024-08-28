import { Service } from 'diod'
import { CreatePetitionCommand } from '@contexts/petition/application/commands/create/CreatePetitionCommand'
import { Petition } from '@contexts/petition/domain/Petition'
import { PetitionRepository } from '@contexts/petition/domain/contracts/PetitionRepository'
import { PetitionStatus } from "@contexts/petition/domain/value_objects/PetitionStatus";

@Service()
export class CreatePetitionService {
    constructor(
        private readonly repository: PetitionRepository,
        // private readonly event_bus: EventBus
    ) {}

    async handle(command: CreatePetitionCommand): Promise<void> {
        PetitionStatus.initialize()
        const petition = Petition.create(
            command.id,
            command.adminCount,
            command.clubCount,
            command.userCount,
            command.email,
            command.description,
            command.phone,
            'PETITION_IN_PROGRESS',
            command.adminId
        )

        await this.repository.save(petition)
        // this.event_bus.publish(petition.pullDomainEvents())
    }
}
