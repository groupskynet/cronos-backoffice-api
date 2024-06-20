import { CreateNewClubRequest } from '@contexts/zones/application/CreatenewClub/CreateNewClubRequest'
import { CreateNewClubService } from '@contexts/zones/application/CreatenewClub/CreateNewClubService'
import { Body, Controller, Path, Put, Route } from 'tsoa'



@Route('club')
export class CreateNewClubController extends Controller {
  constructor(private readonly service: CreateNewClubService) {
    super()
  }

  @Put('/create/{id}')
  public async createNewClub(@Path('id') id: string, @Body() body: CreateNewClubRequest) {
    await this.service.handle({ clubDto: body, zoneId: id })
  }
}
