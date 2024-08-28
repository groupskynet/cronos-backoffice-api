import { Body, Controller, Put, Route, Tags } from 'tsoa'
import { CreatePetitionCommand } from "@contexts/petition/application/commands/create/CreatePetitionCommand";
import { CreatePetitionService } from "@contexts/petition/application/commands/create/CreatePetitionService";

@Route('petition')
@Tags('Petitions')
export class CreatePetitionController extends Controller {
    constructor(private readonly service: CreatePetitionService) {
        super()
    }

    @Put('/create/{id}')
    async createPetition(@Put() id: string, @Body() command: CreatePetitionCommand): Promise<any> {
        command.id = id
        await this.service.handle(command)
        this.setStatus(201)
        return {
            data: id,
            status: 201,
            message: 'Petition created successfully'
        }
    }
}