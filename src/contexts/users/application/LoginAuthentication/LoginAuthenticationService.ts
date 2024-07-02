import { Authentication } from '@contexts/users/domain/contracts/Authentication'
import { UserRepository } from '@contexts/users/domain/contracts/UserRepository'
import { LoginAuthenticationResponse } from './LoginAuthenticationResponse'
import { Service } from 'diod'

@Service()
export class LoginAuthenticationService {
  constructor(private readonly authentication: Authentication, private readonly userRepository: UserRepository) {}

  async handle(username: string, password: string): Promise<LoginAuthenticationResponse> {
    const user = await this.userRepository.findbyName(username)

    if (!user) {
      throw new Error('User not found')
    }

    if (user.password !== password) {
      throw new Error('Iusername or password is incorrect')
    }

    return {
      token: this.authentication.getToken(user),
      name: user.name,
      userId: user.id,
    }
  }
}
