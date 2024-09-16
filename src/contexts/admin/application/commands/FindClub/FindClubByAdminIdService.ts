import { Service } from 'diod'
import { AdminRepository } from '@contexts/admin/domain/contracts/AdminRepository'
import { AdminId } from '@contexts/admin/domain/value_objects/AdminId'
import {FindClubByAdminResponse} from "@contexts/admin/application/commands/FindClub/FindClubByAdminResponse";

@Service()
export class FindClubByAdminIdService {
  constructor(private readonly repository: AdminRepository) {}

  async handle(id: AdminId): Promise<FindClubByAdminResponse> {
    const admin = await this.repository.findById(id)
      if(admin == null)
          throw new Error(`Admin wiht id ${id.value} not found`)

      let response: FindClubByAdminResponse = {
          adminId: admin.id,
          clubs: []
      }
      if(!admin.clubs.isEmpty()){
          admin.clubs.get().forEach((club)=> {
              response.clubs.push(club.toPrimitives())
          })
      }
      return response
  }
}