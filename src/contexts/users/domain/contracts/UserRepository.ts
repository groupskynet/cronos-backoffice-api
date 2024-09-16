import { User } from '../User'
import { UserId } from '../value_objects/UserId'

export abstract class UserRepository {
    abstract update(user: User): Promise<void>
    abstract findById(id: UserId): Promise<User | null>
    abstract findAll(): Promise<User[]>
}