import { FindClubsByZoneService } from '@contexts/zones/application/findClubsByZone/FindClubsByZoneService'
import { ResponseBase } from '@src/api/interfaces/ResponseBase'
import {Controller, Get, Path, Route, Tags } from 'tsoa'

@Route('zones')
@Tags('Zone')
export class GetClubsController extends Controller {
  constructor(private readonly service: FindClubsByZoneService) {
    super()
  }

  @Get('/get_clubs/{id}')
  public async getAll(
    @Path('id') id: string
  ): Promise<ResponseBase> {
    const response = await this.service.handle(id)
    return{
      data: response,
      status: 200,
      message: 'Successful query'
    }
  }
}