import { Admin } from '../Admin'
import { AdminId } from '../value_objects/AdminId'
import { Club } from "@contexts/admin/domain/entity/Club";
import { Maybe } from "@contexts/shared/domain/Maybe";

export abstract class AdminRepository {
      abstract save(admin: Admin): Promise<void>
      abstract findById(id: AdminId): Promise<Admin | null>
      abstract getListClubsByAdminId(id: string, client: any): Promise<Maybe<Club[]>>
      abstract findAll(): Promise<Admin[]>
}