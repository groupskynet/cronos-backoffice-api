import { UserRepository } from "@contexts/users/domain/contracts/UserRepository"
import { Service } from "diod"
import { FindUserByIdResponse } from "./FindUserByIdResponse"

@Service()
export class FindUserByIdService {
    constructor(private readonly userRepository: UserRepository){}

    async handle(id: string): Promise<FindUserByIdResponse> {
        
        const user = await this.userRepository.getFindbyId(id)
        
        if(!user) throw new Error(`User with id ${id} not found`)
        
        return {
            id: user.id,
            name: user.name,
            enabled: user.enabled
        }
    }
}