import { Controller, Get, Route, Tags } from 'tsoa'
import { FindClubByAdminIdService } from '@contexts/admin/application/commands/FindClub/FindClubByAdminIdService'
import { AdminId } from '@contexts/admin/domain/value_objects/AdminId'

@Route('club')
@Tags('Clubs')
export class FindClubByAdminIdController extends Controller {
  constructor(private readonly service: FindClubByAdminIdService) {
    super()
  }

  @Get('/admin/{id}')
  public async findClubByAdminId(id: string) {
    const result = await this.service.handle(new AdminId(id))
    this.setStatus(200)
    return {
      data: result,
      status: 200,
      message: 'Club found'
    }
  }
}