import { Body, Controller, Put, Route, Tags } from 'tsoa'
import { CreateClubCommand } from "@contexts/admin/application/commands/createClub/CreateClubCommand";
import { CreateClubService } from "@contexts/admin/application/commands/createClub/CreateClubService";

@Route('club')
@Tags('Clubs')
export class CreateClubController extends Controller {
    constructor(private readonly service: CreateClubService) {
        super()
    }

    @Put('/create/{id}')
    async createClub(@Put() id: string, @Body() command: CreateClubCommand): Promise<any> {
        command.id = id
        await this.service.handle(command)
        this.setStatus(201)
        return {
            data: id,
            status: 201,
            message: 'Club created successfully'
        }
    }
}