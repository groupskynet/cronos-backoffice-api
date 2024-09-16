import { Body, Controller, Put, Route, Tags } from 'tsoa'
import CreateAdminCommand from '@contexts/admin/application/commands/create/CreateAdminCommand'
import { CreateAdminService } from '@contexts/admin/application/commands/create/CreateAdminService'

@Route('admin')
@Tags('Admin')
export class CreateAdminController extends Controller {
  constructor(private readonly service: CreateAdminService) {
    super()
  }

  @Put('/create/{id}')
  public async createAdmin(@Put() id: string, @Body() request: CreateAdminCommand) {
    request.id = id
    await this.service.handle(request)
    this.setStatus(201)
    return
  }
}