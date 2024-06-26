import { User } from "@contexts/users/domain/User"
import { UserRepository } from "@contexts/users/domain/contracts/UserRepository"
import { UserCreateDto } from "@contexts/users/domain/interfaces/user/UserCreateDto"
import { Service } from "diod"

@Service()
export class CreateNewUserService {
    constructor(private readonly repository: UserRepository
    ){}

    async handle({id, name, password, enabled}: UserCreateDto): Promise<void> {

        const userExits = await this.repository.getFindbyName(name)

        if (userExits != null) throw new Error(`User with name ${name} already exists`)

        const user = User.create({ id, name, password, enabled })

        await this.repository.saveOrUpdate(user)
    }
}