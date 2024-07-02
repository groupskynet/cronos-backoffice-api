import { LoginAuthenticationResponse } from "@contexts/users/application/LoginAuthentication/LoginAuthenticationResponse"
import { LoginAuthenticationService } from "@contexts/users/application/LoginAuthentication/LoginAuthenticationService"
import { Body, Post, Route } from "tsoa"

@Route('users')
export class LoginAuthenticationController {

    constructor(private readonly service: LoginAuthenticationService) {}


    @Post('login')
    public async login(@Body() body: { username: string, password: string }): Promise<LoginAuthenticationResponse> {
        return await this.service.handle(body.username, body.password)
    }
}