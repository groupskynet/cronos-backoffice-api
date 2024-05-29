import { ContainerBuilder } from 'diod'
import { glob } from 'glob'

import { EventBus } from '../../domain/event/EventBus'
import { AwsEventBridgeEventBus } from '../event_bus/AwsEventBridgeEventBus'
import { CreateNewGameOnBallsGenerated } from '@src/contexts/games/application/domain_events/CreateNewGameOnBallsGenerate'
import { GameRepository } from '@contexts/games/domain/contracts/GameRepository'
import { DynamodbGameRepository } from '@contexts/games/infrastructure/DynamodbGameRepository'

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

const services = glob.sync(`src/contexts/**/*Service.ts`)

services.map((service) => {
  const match = service.match(/\/([^/]+)\.ts$/)
  const className = match ? match[1] : ''
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const object = require(service)
  return builder.registerAndUse(object[className]).asSingleton()
})

builder.registerAndUse(CreateNewGameOnBallsGenerated).addTag('subscriber')

builder.register(EventBus).use(AwsEventBridgeEventBus)

export const container = builder.build()
