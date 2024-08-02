import { EditBalanceService } from '@contexts/zones/application/editBalance/EditBalanceService'
import { OperationType } from '@contexts/zones/domain/interfaces/zone/Types'
import { ResponseBase } from '@src/api/interfaces/ResponseBase'
import { Body, Controller, Path, Put, Route, Tags } from 'tsoa'

interface RequestEditBalance {
  
  newBalance: number
  operation: OperationType
  clubId: string
}

@Route('zones')
@Tags('Zone')
export class EditBalanceController extends Controller {
  constructor(private readonly service: EditBalanceService) {
    super()
  }

  @Put('/update_balance/:zoneId')
  public async editBalance(@Path('zoneId') zoneId: string, @Body() body: RequestEditBalance) : Promise<ResponseBase<null>>{
    await this.service.handle({zoneId, ...body})
    return {
      data: null,
      message: 'Balance updated successfully',
      status: 200
    }
  }
}