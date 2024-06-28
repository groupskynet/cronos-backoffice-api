import { UserRepository } from '@contexts/users/domain/contracts/UserRepository'
import { ZoneRepository } from '@contexts/zones/domain/contracts/ZoneRepository'
import { Service } from 'diod'
import { FindRecordersByClubResponse } from './FindRecordersByClubResponse'

@Service()
export class FindRecordersByClubService {
  constructor(private readonly zoneRepository: ZoneRepository, private readonly userRepository: UserRepository) {}

  async handle({ zoneId, clubId }: { zoneId: string; clubId: string }): Promise<FindRecordersByClubResponse> {
    const zone = await this.zoneRepository.getFindbyId(zoneId)
    if (zone == null) throw new Error(`Zone with id ${zoneId} not found`)

    const club = zone.clubs.get().find((x) => x.id === clubId)
    if (club === undefined) throw new Error(`Club with id ${clubId} not found`)

    const recordersResponse: FindRecordersByClubResponse = {
      clubId: '',
      recorders: [],
      zoneId: ''
    }

    recordersResponse.clubId = clubId
    recordersResponse.zoneId = zoneId

    if (!club.recorders.isEmpty()) {
      club.recorders.get().forEach(async (recorder) => {
        const user = await this.userRepository.findbyId(recorder.value)
        if (user !== null)
          recordersResponse.recorders.push({
            id: user.id,
            name: user.name
          })
      })
    }

    return recordersResponse
  }
}
