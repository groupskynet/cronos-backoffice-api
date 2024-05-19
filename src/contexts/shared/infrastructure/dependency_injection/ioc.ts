import { GameRepository } from "@src/contexts/games/domain/GameRepository";
import { DynamodbGameRepository } from "@src/contexts/games/infrastructure/DynamodbGameRepository";
import { ContainerBuilder } from "diod";
import { IocContainer } from "tsoa";

const builder = new ContainerBuilder();

builder.register(GameRepository).use(DynamodbGameRepository);

const container = builder.build();

export const iocContainer: IocContainer = {
  get<T>(controller: new (...args: any[]) => T): T {
    return container.get(controller);
  },
};
