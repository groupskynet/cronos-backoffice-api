import { GetClubResponse } from "@contexts/zones/application/getClub/GetClubResponse"
import { GetClubService } from "@contexts/zones/application/getClub/GetClubService"
import { ResponseBase } from "@src/api/interfaces/ResponseBase"
import { Controller, Get, Path, Route, Tags } from "tsoa"

@Route('clubs')
@Tags('Club')
export class GetClubController extends Controller {
    constructor(private readonly service: GetClubService){
        super()
    }

    @Get('/get_club/:id/:zoneId')
    public async GetClub(
        @Path() id: string,
        @Path() zoneId: string
      ): Promise<ResponseBase<GetClubResponse>> {
        const response = await this.service.handle(id, zoneId)
        return {data: response, status: 200, message: 'Query executed successfully'}
      }
    
}