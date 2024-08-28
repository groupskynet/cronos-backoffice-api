export interface CreatePetitionCommand {
    id: string;
    adminId: string;
    adminCount: number;
    clubCount: number;
    userCount: number;
    description: string;
    email: string;
    phone: string;
}