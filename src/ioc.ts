import { IocContainer } from 'tsoa'
import { container } from './contexts/shared/infrastructure/dependency_injection/diod.config'

export const iocContainer: IocContainer = {
  get<T>(controller: new (...args: unknown[]) => T): T {
    return container.get(controller)
  }
}
