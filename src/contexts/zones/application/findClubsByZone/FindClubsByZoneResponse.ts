export interface FindClubsByZoneResponse {
  
    zoneId: string,
    clubs: FindClubsResponse[]



}

export interface FindClubsResponse {
    id: string;
    name: string;
    address: string;
    balance: number;
    zoneTime: string;
}