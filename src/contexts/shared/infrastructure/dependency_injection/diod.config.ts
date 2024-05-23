import { GameRepository } from '@contexts/games/domain/GameRepository';
import { DynamodbGameRepository } from '@contexts/games/infrastructure/DynamodbGameRepository';
import { CreateNewGame } from '@contexts/games/application/CreateNewGame';
import { CreateNewGameOnBallsGenerated } from '@contexts/games/application/CreateNewGameOnBallsGenerate';
import { ContainerBuilder } from 'diod';

const builder = new ContainerBuilder();

builder.register(GameRepository).use(DynamodbGameRepository);

builder.registerAndUse(CreateNewGame);
builder.registerAndUse(CreateNewGameOnBallsGenerated).addTag('subscriber');

export const container = builder.build();
