import { GameRepository } from "@contexts/games/domain/GameRepository";
import { DynamodbGameRepository } from "@contexts/games/infrastructure/DynamodbGameRepository";
import { ContainerBuilder } from "diod";

const builder = new ContainerBuilder();

builder.register(GameRepository).use(DynamodbGameRepository);

export const container = builder.build();


