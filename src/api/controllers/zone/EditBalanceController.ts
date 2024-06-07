import { EditBalanceService } from '@contexts/zones/application/EditBalanceService'
import { Body, Controller, Path, Put, Route } from 'tsoa'

interface RequestEditBalance {
  
  newBalance: number
  isAdd: boolean
  idClub: string
}

@Route('zone')
export class EditBalanceController extends Controller {
  constructor(private readonly service: EditBalanceService) {
    super()
  }

  @Put('/update_balance/{id}')
  public async editBalance(@Path('id') id: string, @Body() body: RequestEditBalance) {
    await this.service.handle({idZone: id, newBalance: body.newBalance, isAdd: body.isAdd, idClub: body.idClub}
    )
  }
}