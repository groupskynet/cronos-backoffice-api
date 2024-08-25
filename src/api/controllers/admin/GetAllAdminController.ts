import { Controller, Get, Route, Tags } from 'tsoa'
import { GetAllAdminService } from '@contexts/admin/application/commands/GetAll/GetAllAdminService'
@Route('admin')
@Tags('Admin')
export class GetAllAdminController extends Controller {
  constructor(private readonly service: GetAllAdminService) {
    super()
  }

  @Get('/get-all')
  public async getAllAdmin() {
    const result = await this.service.handle()
    this.setStatus(200)
    return {
      data: result,
      status: 200,
      message: 'All admins found'
    }
  }
}