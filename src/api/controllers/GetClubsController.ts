
import { FindClubsByZoneService } from '@contexts/zones/application/FindClubsByZoneService'
import {Controller, Get, Path, Route } from 'tsoa'

@Route('zone')
export class GetClubsController extends Controller {
  constructor(private readonly service: FindClubsByZoneService) {
    super()
  }

  @Get('/get_clubs/{id}')
  public async getAll(
    @Path('id') id: string
  ) {
    return await this.service.handle(id)
  }
}