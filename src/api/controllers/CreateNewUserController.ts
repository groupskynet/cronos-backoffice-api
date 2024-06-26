import { CreateNewUserService } from "@contexts/users/application/createNewUser.ts/CreateNewUserService"
import { Body, Path, Put, Route } from "tsoa"

@Route('user')
export class CreateNewUserController {
  constructor(private readonly service: CreateNewUserService) {}

  @Put('/create/{id}')
  public async createNewClub(@Path('id') id: string, @Body() body: {name: string, password: string, enabled: boolean}) {
    await this.service.handle({id, ...body})
  }
}