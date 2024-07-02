import { User } from "../User"

export abstract class Authentication {
    public abstract getToken(user: User): string;
} 