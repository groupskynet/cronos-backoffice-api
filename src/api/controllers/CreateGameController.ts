import { Body, Controller, Post, Route } from "tsoa";
import { GameRepository } from "@contexts/games/domain/GameRepository";

@Route("game")
export class CreateGameController extends Controller {
  constructor(private readonly repository: GameRepository) {
    super();
  }

  @Post("/create")
  public async createGame(@Body() request: any) {
    console.log("request ->", request);
    this.setStatus(200);
    this.repository.save();
    return;
  }
}
