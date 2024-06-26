import { ContainerBuilder } from 'diod'
import { glob } from 'glob'

import { EventBus } from '../../domain/event/EventBus'
import { AwsEventBridgeEventBus } from '../event_bus/AwsEventBridgeEventBus'
import { CreateNewGameOnBallsGenerated } from '@src/contexts/games/application/domain_events/CreateNewGameOnBallsGenerate'
import { GameRepository } from '@contexts/games/domain/contracts/GameRepository'
import { DynamodbGameRepository } from '@contexts/games/infrastructure/DynamodbGameRepository'
import { ZoneRepository } from '@contexts/zones/domain/contracts/ZoneRepository'
import { DynamodbConnection } from '../DynamodbConnection'
import { DynamodbZoneRepository } from '@contexts/zones/infrastructure/DynamodbZoneRepository'
import { UserRepository } from '@contexts/users/domain/contracts/UserRepository'
import { DynamodbUserRepository } from '@contexts/users/infrastructure/DynamodbUserRepository'

const builder = new ContainerBuilder()

builder.registerAndUse(DynamodbConnection)
builder.register(GameRepository).use(DynamodbGameRepository)

const controllers = glob.sync(`src/**/*Controller.ts`, { posix: true })

controllers.map((controller) => {
  const match = controller.match(/\/([^/]+)\.ts$/)
  const className = match ? match[1] : ''
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const object = require(controller)
  return builder.registerAndUse(object[className]).asSingleton()
})

const services = glob.sync(`src/contexts/**/*Service.ts`, { posix: true })

services.map((service) => {
  const match = service.match(/\/([^/]+)\.ts$/)
  const className = match ? match[1] : ''
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const object = require(service)
  return builder.registerAndUse(object[className]).asSingleton()
})

builder.registerAndUse(CreateNewGameOnBallsGenerated).addTag('subscriber')

builder.register(EventBus).use(AwsEventBridgeEventBus)

builder.register(ZoneRepository).use(DynamodbZoneRepository)
builder.register(UserRepository).use(DynamodbUserRepository)

export const container = builder.build()
