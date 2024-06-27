
import { FindClubsByZoneResponse } from '@contexts/zones/application/findClubsByZone/FindClubsByZoneResponse'
import { FindClubsByZoneService } from '@contexts/zones/application/findClubsByZone/FindClubsByZoneService'
import {Controller, Get, Path, Route } from 'tsoa'

@Route('zones')
export class GetClubsController extends Controller {
  constructor(private readonly service: FindClubsByZoneService) {
    super()
  }

  @Get('/get_clubs/{id}')
  public async getAll(
    @Path('id') id: string
  ): Promise<FindClubsByZoneResponse> {
    return await this.service.handle(id)
  }
}