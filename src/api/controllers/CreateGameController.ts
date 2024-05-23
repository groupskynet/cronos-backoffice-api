import { Body, Controller, Post, Route } from "tsoa";

@Route("game")
export class CreateGameController extends Controller {
  constructor() {
    super();
  }

  @Post("/create")
  public async createGame(@Body() request: any) {
    console.log("request ->", request);
    this.setStatus(200);
    
    return;
  }
}
