import { ContainerBuilder } from 'diod'
import { glob } from 'glob'

import { EventBus } from '../../domain/event/EventBus'
import { AwsEventBridgeEventBus } from '../event_bus/AwsEventBridgeEventBus'
import { CreateNewGameOnBallsGenerated } from '@src/contexts/games/application/domain_events/CreateNewGameOnBallsGenerate'
import { GameRepository } from '@contexts/games/domain/contracts/GameRepository'
import { DynamodbGameRepository } from '@contexts/games/infrastructure/DynamodbGameRepository'
import { CreateNewGame } from '@contexts/games/application/CreateNewGame'
import { UpdatePendingGameToPlayService } from '@contexts/games/application/UpdatePendingGameToPlayService'

const builder = new ContainerBuilder()

const controllers = glob.sync(`src/**/*Controller.ts`)

controllers.map((controller) => {
  const match = controller.match(/\/([^/]+)\.ts$/)
  const className = match ? match[1] : ''
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const object = require(controller)
  return builder.registerAndUse(object[className]).asSingleton()
})

builder.register(GameRepository).use(DynamodbGameRepository)

builder.registerAndUse(CreateNewGame)
builder.registerAndUse(CreateNewGameOnBallsGenerated).addTag('subscriber')
builder.registerAndUse(UpdatePendingGameToPlayService)

builder.register(EventBus).use(AwsEventBridgeEventBus)

export const container = builder.build()
