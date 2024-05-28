import { UserName } from "./value_objects/user/UserName";

export class User{
    private _name: UserName;
    constructor({name}: {name: UserName}){
        this._name = name;
    }
    static create(nameIn: string): User{
        const name = new UserName(nameIn);

        const user = new User({name});

        return user;
    } 

    get name(): string{
        return this._name.value;
    }
}