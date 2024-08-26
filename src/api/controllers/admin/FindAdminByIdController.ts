import { Controller, Get, Route, Tags } from 'tsoa'
import { FindAdminByIdService} from "@contexts/admin/application/commands/Find/FindAdminByIdService";
import { AdminId } from "@contexts/admin/domain/value_objects/AdminId";

@Route('admin')
@Tags('Admin')
export class FindAdminByIdController extends Controller {
  constructor(private readonly service: FindAdminByIdService) {
    super()
  }

  @Get('/{id}')
  public async findAdminById(id: string) {
    const result = await this.service.handle(new AdminId(id))
    this.setStatus(200)
    return {
      data: result,
      status: 200,
      message: 'Admin found'
    }
  }
}