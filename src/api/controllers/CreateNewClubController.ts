import { CreateNewClubRequest } from '@contexts/zones/application/CreatenewClub/CreateNewClubRequest'
import { CreateNewClubService } from '@contexts/zones/application/CreatenewClub/CreateNewClubService'
import { Body, Controller, Path, Put, Route } from 'tsoa'



@Route('club')
export class CreateNewClubController extends Controller {
  constructor(private readonly service: CreateNewClubService) {
    super()
  }

  @Put('/create/{zoneId}')
  public async createNewClub(@Path('zoneId') zoneId: string, @Body() body: CreateNewClubRequest) {
    await this.service.handle({ clubDto: body, zoneId })
  }
}
