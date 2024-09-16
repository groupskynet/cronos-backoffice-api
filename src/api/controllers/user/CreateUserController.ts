import { Body, Controller, Put, Route, Tags } from 'tsoa'
import { CreateUserCommand } from '@contexts/users/application/create/CreateUserCommand'
import { CreateUserService } from '@contexts/users/application/create/CreateUserService'

@Route('user')
@Tags('Users')
export class CreateUserController extends Controller {
  constructor(private readonly service: CreateUserService) {
    super()
  }

  @Put('/create/{id}')
  public async createUser(@Put() id: string, @Body() request: CreateUserCommand) {
    request.id = id
    await this.service.handle(request)
    this.setStatus(201)
    return {
      data: id,
      status: 201,
      message: 'Club created successfully'
    }
  }
}