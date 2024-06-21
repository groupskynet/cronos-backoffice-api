export interface FindRecordersByClubResponse{
    zoneId: string,
    clubId: string,
    recorders: recorderClubResponse[]
}

export interface recorderClubResponse{
    id: string,
    name: string
}