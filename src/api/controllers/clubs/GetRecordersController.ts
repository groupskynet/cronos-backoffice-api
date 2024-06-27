import { FindRecordersByClubResponse } from "@contexts/zones/application/findRecordersByClub/FindRecordersByClubResponse"
import { FindRecordersByClubService } from "@contexts/zones/application/findRecordersByClub/FindRecordersByClubService"
import { Controller, Get, Query, Route } from "tsoa"

@Route('clubs')
export class GetRecordersController extends Controller {

    constructor(private readonly service: FindRecordersByClubService){
        super()
    }

    @Get('/get_recorders')
    public async GetRecorders(
        @Query() zoneId: string,
        @Query() clubId: string
      ): Promise<FindRecordersByClubResponse> {
        return await this.service.handle({zoneId,clubId})
      }
}