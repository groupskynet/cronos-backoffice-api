import { Service } from 'diod'
import { Admin } from '@contexts/admin/domain/Admin'
import { AdminRepository } from '@contexts/admin/domain/contracts/AdminRepository'
import CreateAdminCommand from '@contexts/admin/application/commands/create/CreateAdminCommand'

@Service()
export class CreateAdminService {
  constructor(
    private readonly repository: AdminRepository,
    // private readonly event_bus: EventBus
  ) {}

  async handle(command: CreateAdminCommand): Promise<void> {
    const admin = Admin.create(
      command.id,
      command.name,
      command.balance,
      command.percentage,
      command.username,
      command.password,

    )
    await this.repository.save(admin)
    // this.event_bus.publish(admin.pullDomainEvents())
  }
}