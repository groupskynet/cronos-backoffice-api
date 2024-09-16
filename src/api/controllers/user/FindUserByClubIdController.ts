import { Controller, Get, Route, Tags } from 'tsoa'
import { FindUserByClubIdService} from '@contexts/users/application/findUser/FindUserByClubIdService'

@Route('user')
@Tags('Users')
export class FindUserByClubIdController extends Controller {
  constructor(private readonly service: FindUserByClubIdService) {
    super()
  }

  @Get('/club/{id}')
  public async findUserByClubId(id: string) {
    const result = await this.service.handle(id)
    this.setStatus(200)
    return {
      data: result,
      status: 200,
      message: 'User found'
    }
  }
}