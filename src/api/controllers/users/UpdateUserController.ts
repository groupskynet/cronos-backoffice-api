import { UpdateUserService } from "@contexts/users/application/updateUser/UpdateUserService"
import { UpdateUserRequest } from "@contexts/users/application/updateUser/UpdateuserRequest"
import { Body, Controller, Path, Put, Route, Tags } from "tsoa"

@Route('users')
@Tags('User')
export class UpdateUserController extends Controller {

    constructor(private readonly service: UpdateUserService){
        super()
    }
    @Put('update/{id}')
    public async updateUser(@Path('id') id: string, @Body() body: UpdateUserRequest): Promise<void> {
        await this.service.handle(id, body)
    }
    
}