import { Service } from 'diod'
import { PetitionRepository } from '@contexts/petition/domain/contracts/PetitionRepository'
import { PetitionResponse } from '@contexts/petition/application/commands/PetitionResponse';

@Service()
export class GetAllPetitionService {
    constructor(private readonly repository: PetitionRepository) {}

    async handle(): Promise<PetitionResponse[]> {
        const petitions = await this.repository.findAll()
        return petitions.map((petition) => (petition.toPrimitives()))
    }
}