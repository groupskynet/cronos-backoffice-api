import { DynamodbGameRepository } from '@contexts/games/infrastructure/DynamodbGameRepository'
import { CreateNewGame } from '@contexts/games/application/CreateNewGame'
import { ContainerBuilder } from 'diod'
import { EventBus } from '../../domain/event/EventBus'
import { AwsEventBridgeEventBus } from '../event_bus/AwsEventBridgeEventBus'
import { GameRepository } from '@src/contexts/games/domain/contracts/GameRepository'
import { CreateNewGameOnBallsGenerated } from '@src/contexts/games/application/domain_events/CreateNewGameOnBallsGenerate'

const builder = new ContainerBuilder()

builder.register(GameRepository).use(DynamodbGameRepository)

builder.registerAndUse(CreateNewGame)
builder.registerAndUse(CreateNewGameOnBallsGenerated).addTag('subscriber')

builder.register(EventBus).use(AwsEventBridgeEventBus)

export const container = builder.build()
