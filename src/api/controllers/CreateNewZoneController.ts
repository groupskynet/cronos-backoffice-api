import { CreateNewZoneService } from '@contexts/zones/application/CreateNewZoneService'
import { ZoneRequest } from '@contexts/zones/domain/interfaces/ZoneRequest'
import { Body, Controller, Path, Put, Route } from 'tsoa'

@Route('zone')
export class CreateNewZoneController extends Controller {
  constructor(private readonly service: CreateNewZoneService) {
    super()
  }

  @Put('/create/{id}')
  public async createNewZone(@Path('id') id: string, @Body() body: ZoneRequest) {
    await this.service.handle({ ...body, id })
  }
}
