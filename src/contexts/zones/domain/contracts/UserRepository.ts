import { User } from "../User"

export abstract class UserRepository{
    abstract saveOrUpdate(user: User): Promise<void>;
    abstract getFindbyId(id: string): Promise<User|null>;
}