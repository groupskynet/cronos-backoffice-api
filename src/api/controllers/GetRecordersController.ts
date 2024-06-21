import { FindRecordersByClubResponse } from "@contexts/zones/application/findRecordersByClub/FindRecordersByClubResponse"
import { FindRecordersByClubService } from "@contexts/zones/application/findRecordersByClub/FindRecordersByClubService"
import { Get, Query, Route } from "tsoa"

@Route('club')
export class GetRecordersController{

    constructor(private readonly service: FindRecordersByClubService){}

    @Get('/get_recorders')
    public async GetRecorders(
        @Query() zoneId: string,
        @Query() clubId: string
      ): Promise<FindRecordersByClubResponse> {
        return await this.service.handle({zoneId,clubId})
      }
}