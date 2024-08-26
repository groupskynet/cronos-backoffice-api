import { Service } from 'diod'
import { AdminRepository } from '@contexts/admin/domain/contracts/AdminRepository'
import { AdminId } from '@contexts/admin/domain/value_objects/AdminId'
// import { Admin } from '@contexts/admin/domain/Admin'
import { AdminResponse } from '@contexts/admin/application/commands/AdminResponse'

@Service()
export class FindAdminByIdService {
  constructor(private readonly repository: AdminRepository) {}

  async handle(id: AdminId): Promise<AdminResponse | null> {
    const admin = await this.repository.findById(id)
    return admin ? admin.toPrimitives() : null
  }
}