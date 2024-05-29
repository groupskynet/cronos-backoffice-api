import { UpdatePendingGameToPlayService } from '@contexts/games/application/UpdatePendingGameToPlayService'
import { Controller, Put, Path, Route, SuccessResponse, Body } from 'tsoa'

@Route('game')
export class UpdateGameController extends Controller {
  constructor(private readonly service: UpdatePendingGameToPlayService) {
    super()
  }

  @Put('update/{id}')
  @SuccessResponse('200', 'Updated')
  async run(@Path() id: string, @Body() body: { balls: number[] }): Promise<void> {
    this.service.run(id, body.balls)
  }
}
