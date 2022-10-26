export interface IUser {
    email: string,
    password: string
}

export interface IBaseUser {
    companyName : string;
}

export class User implements IUser {
    constructor(public email : string, public password : string){}
}