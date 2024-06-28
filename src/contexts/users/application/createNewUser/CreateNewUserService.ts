import { User } from "@contexts/users/domain/User"
import { UserRepository } from "@contexts/users/domain/contracts/UserRepository"
import { UserCreateOrUpdateDto } from "@contexts/users/domain/interfaces/user/UserCreateOrUpdateDto"
import { Service } from "diod"

@Service()
export class CreateNewUserService {
    constructor(private readonly repository: UserRepository
    ){}

    async handle({id, name, password, enabled}: UserCreateOrUpdateDto): Promise<void> {

        const userExits = await this.repository.findbyName(name)


        if (userExits) throw new Error(`User with name ${name} already exists`)

        const userExitsId = await this.repository.findbyId(id)

        if (userExitsId) throw new Error(`User with id ${id} already exists`)

        const user = User.createOrUpdate({ id, name, password, enabled })

        await this.repository.saveOrUpdate(user)
    }
}