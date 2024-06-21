import { EditBalanceService } from '@contexts/zones/application/editBalance/EditBalanceService'
import { Body, Controller, Path, Put, Route } from 'tsoa'

interface RequestEditBalance {
  
  newBalance: number
  isAdd: boolean
  clubId: string
}

@Route('zone')
export class EditBalanceController extends Controller {
  constructor(private readonly service: EditBalanceService) {
    super()
  }

  @Put('/update_balance/{zoneId}')
  public async editBalance(@Path('zoneId') zoneId: string, @Body() body: RequestEditBalance) {
    await this.service.handle({zoneId, ...body}
    )
  }
}