import { FindRecordersByClubResponse } from "@contexts/zones/application/findRecordersByClub/FindRecordersByClubResponse"
import { FindRecordersByClubService } from "@contexts/zones/application/findRecordersByClub/FindRecordersByClubService"
import { Controller, Get, Path, Route, Tags } from "tsoa"

@Route('clubs')
@Tags('Club')
export class GetRecordersController extends Controller {

    constructor(private readonly service: FindRecordersByClubService){
        super()
    }

    @Get('/get_recorders/:id/:zoneId')
    public async GetRecorders(
      @Path() id: string,
      @Path() zoneId: string
      ): Promise<FindRecordersByClubResponse> {
        return await this.service.handle({zoneId,id})
      }
}