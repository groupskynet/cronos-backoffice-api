export interface CreateClubCommand {
    id: string
    adminId: string
    name: string
    balance: number
    demography: {
        name: string
        address: string
        timeZone: string
    }
}