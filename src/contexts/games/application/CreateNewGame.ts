import { Service } from 'diod';
import { Game } from '../domain/Game';
import { GameRepository } from '../domain/GameRepository';
import { GameRound } from '../domain/GameRound';

@Service()
export class CreateNewGame {
  constructor(private readonly repository: GameRepository) {}

  async handle({ id, balls, createdAt }: { id: string; balls: number[]; createdAt: Date }): Promise<void> {
    const round = GameRound.generate();
    const game = Game.create(id, balls, createdAt, round);
    this.repository.save(game);
  }
}
