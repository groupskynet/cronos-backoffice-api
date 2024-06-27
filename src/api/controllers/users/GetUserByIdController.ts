import { FindUserByIdResponse } from "@contexts/users/application/findUserById/FindUserByIdResponse"
import { FindUserByIdService } from "@contexts/users/application/findUserById/FindUserByIdService"
import { Controller, Get, Path, Route } from "tsoa"

@Route("users")
export class GetUserByIdController extends Controller {
    constructor(private readonly findUserByIdService: FindUserByIdService){
        super()
    }

    @Get("get_by_id/{id}")
    async get(@Path("id") id: string): Promise<FindUserByIdResponse> {
        return await this.findUserByIdService.handle(id)
    }
}