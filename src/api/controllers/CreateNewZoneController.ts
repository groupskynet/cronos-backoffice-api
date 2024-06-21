import { Body, Controller, Path, Put, Route } from 'tsoa'
import { CreateNewZoneRequest } from '@contexts/zones/application/createNewZone/CreateNewZoneRequest'
import { CreateNewZoneService } from '@contexts/zones/application/createNewZone/CreateNewZoneService'

@Route('zone')
export class CreateNewZoneController extends Controller {
  constructor(private readonly service: CreateNewZoneService) {
    super()
  }

  @Put('/create/{id}')
  public async createNewZone(@Path('id') id: string, @Body() body: CreateNewZoneRequest) {
    await this.service.handle(id, body)
  }
}
