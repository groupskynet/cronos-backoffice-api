import { CreateNewZoneService } from "@contexts/zones/application/CreateNewZoneService"
import { ZoneIn } from "@contexts/zones/domain/interfaces/ZoneIn"
import { Body, Controller, Path, Put, Route } from "tsoa"

@Route('zone')
export class CreateNewZoneController extends Controller {

    constructor(private readonly service: CreateNewZoneService) {
        super()
      }
    
      @Put('/create/{id}')
      public async createNewZone(@Path('id') id: string, @Body() body: ZoneIn) {
        await this.service.handle({ ...body, id })
      }
}
