export interface FindClubByAdminResponse {
    adminId: string;
    clubs: FindClubResponse[];
}

export interface FindClubResponse {
    id: string;
    name: string;
    balance: number;
    demography: any;
    createdAt: Date;
}