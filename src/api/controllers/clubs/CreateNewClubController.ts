import { CreateNewClubRequest } from '@contexts/zones/application/createNewClub/CreateNewClubRequest'
import { CreateNewClubService } from '@contexts/zones/application/createNewClub/CreateNewClubService'
import { ResponseBase } from '@src/api/interfaces/ResponseBase'
import { Body, Controller, Path, Put, Route, Tags } from 'tsoa'



@Route('clubs')
@Tags('Club')
export class CreateNewClubController extends Controller {
  constructor(private readonly service: CreateNewClubService) {
    super()
  }

  @Put('/create/:id')
  public async createNewClub(@Path('id') id: string, @Body() body: CreateNewClubRequest) : Promise<ResponseBase<string>> {
    await this.service.handle({ clubDto: body, id })
    return {
      data: id,
      status: 201,
      message: 'club created successfully'
    }
  }
}
