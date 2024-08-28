import { Petition } from '../Petition'
import { PetitionId } from '../value_objects/PetitionId'

export abstract class PetitionRepository {
    abstract save(petition: Petition): Promise<void>
    abstract findById(id: PetitionId): Promise<Petition | null>
    abstract findAll(): Promise<Petition[]>
}