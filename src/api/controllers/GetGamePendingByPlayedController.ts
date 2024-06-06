import { QueryPendingGameToPlayService } from '@contexts/games/application/QueryPendingGameToPlayService'
import { Controller, Get, Route } from 'tsoa'

interface Game {
  id: string
  balls: number[] | null
  createdAt: Date
  round: string
  status: string
}

@Route('game')
export class GetGamePendingByPlayedController extends Controller {
  constructor(private readonly service: QueryPendingGameToPlayService) {
    super()
  }

  @Get('pending_by_played')
  async run(): Promise<Game> {
    const game = await this.service.run()
    return game.toPrimitives()
  }
}
