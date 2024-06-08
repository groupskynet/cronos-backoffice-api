import { DemographyDto } from '@contexts/shared/domain/interfaces/DemographyDto'
import { CreateNewClubService } from '@contexts/zones/application/CreateNewClubService'
import { Body, Controller, Path, Put, Route } from 'tsoa'



@Route('club')
export class CreateNewClubController extends Controller {
  constructor(private readonly service: CreateNewClubService) {
    super()
  }

  @Put('/create/{id}')
  public async createNewClub(@Path('id') id: string, @Body() body: DemographyDto) {
    await this.service.handle({ clubDemography: body, zoneId: id })
  }
}
