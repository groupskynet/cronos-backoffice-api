import { Service } from 'diod'
import { ClubRepository } from '@contexts/admin/domain/contracts/ClubRepository'
import { ClubId } from '@contexts/admin/domain/value_objects/ClubId'
import { FindUserByClubIdResponse } from '@contexts/users/application/findUser/FindUserByClubIdResponse'

@Service()
export class FindUserByClubIdService {
  constructor(private readonly repository: ClubRepository) {}

  async handle(id: string): Promise<FindUserByClubIdResponse | null> {
    const club = await this.repository.findById(new ClubId(id))
    if(club == null)
        throw new Error(`Club with id ${id} not found`)

    let response: FindUserByClubIdResponse = {
        clubId: club.id,
        users: []
    }
    if(!club.users.isEmpty()){
        club.users.get().forEach((user)=> {
            response.users.push(user.toPrimitives())
        })
    }
    return response
  }
}