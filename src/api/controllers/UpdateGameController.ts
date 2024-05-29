import { GameRepository } from '@contexts/games/domain/contracts/GameRepository'
import { Controller, Put, Path, Route, SuccessResponse } from 'tsoa'

@Route('game')
export class UpdateGameController extends Controller {

  constructor(private readonly service: Update) {}

  @Put('update/{id}')
  @SuccessResponse('200', 'Updated')
  async run(@Path() id: string): Promise<void> {}
}
