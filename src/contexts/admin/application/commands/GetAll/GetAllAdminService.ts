import { Service } from 'diod'
import { AdminRepository } from '@contexts/admin/domain/contracts/AdminRepository'
import { AdminResponse } from "@contexts/admin/application/commands/AdminResponse";


@Service()
export class GetAllAdminService {
  constructor(private readonly repository: AdminRepository) {}

  async handle(): Promise<AdminResponse[]> {
      const admins = await this.repository.findAll()
      return admins.map((admin) => (admin.toPrimitives() ))
  }
}