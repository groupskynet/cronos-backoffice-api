import { UpdateClubRequest } from "@contexts/zones/application/updateClub/UpdateClubRequest"
import { UpdateClubService } from "@contexts/zones/application/updateClub/UpdateClubService"
import { ResponseBase } from "@src/api/interfaces/ResponseBase"
import { Body, Controller, Path, Put, Route, Tags } from "tsoa"

@Route('clubs')
@Tags('Club')
export class UpdateClubController extends Controller {
    
    constructor(private readonly service: UpdateClubService) {
        super()
    }

    @Put('/update/:id')
    public async updateClub(@Path('id') id: string, @Body() body: UpdateClubRequest) : Promise<ResponseBase<null>>{
        await this.service.handle(id, body)
        return {
            data: null,
            message: 'Club updated successfully',
            status: 200
        }
    }
}