import { User } from "../User"

export abstract class UserRepository{
    abstract saveOrUpdate(user: User): Promise<void>;
    abstract findbyId(id: string): Promise<User|null>;
    abstract findbyName(name: string): Promise<User|null>;
}