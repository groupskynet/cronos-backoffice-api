import { FindRecordersByClubService } from "@contexts/zones/application/FindRecordersByClubService"
import { Get, Query, Route } from "tsoa"

@Route('club')
export class GetRecordersController{

    constructor(private readonly service: FindRecordersByClubService){}

    @Get('/get-recorders')
    public async GetRecorders(
        @Query() idZone: string,
        @Query() idClub: string
      ) {
        return await this.service.handle({idZone,idClub})
      }
}