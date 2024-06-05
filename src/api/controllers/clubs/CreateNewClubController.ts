import { CreateNewClubService } from '@contexts/zones/application/CreateNewClubService'
import { Body, Controller, Path, Put, Route } from 'tsoa'

interface RequestCreateClub {
  id: string
  name: string
  balance: number
  address: string
  timeZone: string
}

@Route('club')
export class CreateNewClubController extends Controller {
  constructor(private readonly service: CreateNewClubService) {
    super()
  }

  @Put('/create/{id}')
  public async createNewClub(@Path('id') id: string, @Body() body: RequestCreateClub) {
    await this.service.handle({ clubDemography: body, zoneId: id })
  }
}
