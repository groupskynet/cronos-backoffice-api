export interface FindUserByClubIdResponse {
    clubId: string
    users: FindUserResponse[]
}

export interface FindUserResponse {
    id: string
    name: string
    username: string
    password: string
    enabled: boolean
    clubId: string
    createdAt: Date
}

