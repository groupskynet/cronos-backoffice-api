
import { CreateNewClubRequest } from '@contexts/zones/application/CreatenewClub/CreateNewClubRequest'
import { CreateNewClubService } from '@contexts/zones/application/CreatenewClub/CreateNewClubService'
import { ResponseBase } from '@src/api/interfaces/ResponseBase'
import { Body, Controller, Path, Put, Route, Tags } from 'tsoa'



@Route('clubs')
@Tags('Club')
export class CreateNewClubController extends Controller {
  constructor(private readonly service: CreateNewClubService) {
    super()
  }

  @Put('/create/{zoneId}')
  public async createNewClub(@Path('zoneId') zoneId: string, @Body() body: CreateNewClubRequest) : Promise<ResponseBase<string>> {
    await this.service.handle({ clubDto: body, zoneId })
    return {
      data: body.id,
      status: 201,
      message: 'club created successfully'
    }
  }
}
