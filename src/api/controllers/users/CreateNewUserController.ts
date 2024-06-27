import { CreateNewUserService } from "@contexts/users/application/createNewUser/CreateNewUserService"
import { Body, Controller, Path, Put, Route } from "tsoa"

@Route('users')
export class CreateNewUserController extends Controller {
  constructor(private readonly service: CreateNewUserService) {
    super()
  }

  @Put('/create/{id}')
  public async createNewClub(@Path('id') id: string, @Body() body: {name: string, password: string, enabled: boolean}) {
    await this.service.handle({id, ...body})
  }
}