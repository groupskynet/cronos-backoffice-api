import { User } from "@contexts/users/domain/User"
import { UserRepository } from "@contexts/users/domain/contracts/UserRepository"
import { Service } from "diod"
import { UpdateUserRequest } from "./UpdateuserRequest"

@Service()
export class UpdateUserService {
    constructor(private readonly userRepository: UserRepository){}

    async handle(id: string,{ name, password, enabled}: UpdateUserRequest): Promise<void> {
        const user = await this.userRepository.getFindbyId(id)

        if(!user) throw new Error(`User with id ${id} not found`)

        const updatedUser = User.createOrUpdate({id,name, password, enabled})

        await this.userRepository.saveOrUpdate(updatedUser)
    }
}