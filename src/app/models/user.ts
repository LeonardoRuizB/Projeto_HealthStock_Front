import IAddress from "./address";
import IContact from "./contact";

export interface IUser {
    id: number,
    email: string,
    password: string
}

export interface IBaseUser {
    id : number;
    companyName : string;
    cnpj: string;
    addresses: IAddress[];
    contacts: IContact[];
}

export class User implements IUser {
    constructor(public id: number, public email : string, public password : string){}
}
