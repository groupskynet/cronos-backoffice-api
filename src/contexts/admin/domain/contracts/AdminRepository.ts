import { Admin } from '../Admin'
// import { AdminId } from '../value_objects/AdminId

export abstract class AdminRepository {
      abstract save(admin: Admin): Promise<void>
      abstract find(id: string): Promise<Admin | null>
      abstract findAll(): Promise<Admin[]>
}