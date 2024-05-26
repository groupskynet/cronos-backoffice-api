import { Controller, Post, Route } from 'tsoa'

@Route('game')
export class CreateGameController extends Controller {
	constructor() {
		super()
	}

	@Post('/create')
	public async createGame() {
		this.setStatus(200)
		return
	}
}
