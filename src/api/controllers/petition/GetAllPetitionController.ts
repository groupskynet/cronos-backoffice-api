import { Controller, Get, Route, Tags } from 'tsoa'
import { GetAllPetitionService } from '@contexts/petition/application/commands/getAll/GetAllPetitionService'
@Route('petition')
@Tags('Petitions')
export class GetAllPetitionController extends Controller {
    constructor(private readonly service: GetAllPetitionService) {
        super()
    }

    @Get('/get-all')
    async getAllPetition(): Promise<any> {
        const petitions = await this.service.handle()
        this.setStatus(200)
        return {
            data: petitions,
            status: 200,
            message: 'Petitions retrieved successfully'
        }
    }
}