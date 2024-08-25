
export interface AdminResponse {
   id: string;
   name: string;
   balance: number;
   percentage: number;
   username: string;
   password: string;
   createdAt: Date;
   clubs: any;
}

export interface Club {
   id: string;
   name: string;
   balance: number;
   demography: any;
}

// interface Demography {
//     name: string;
//     adress: string;
//     timmeZone: string;
// }