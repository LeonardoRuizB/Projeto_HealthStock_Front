import address from "./address";
import contact from "./contact";
import { IBaseUser } from "./user";

export default class Buyer implements IBaseUser {
    id: number;
    companyName: string;
    addresses: address[];
    contacts: contact[];
    cnpj: string;

    constructor(data : any){
        this.id = data.id;
        this.companyName = data.companyName;
        this.addresses = data.addresses;
        this.contacts = data.contacts;
        this.cnpj = data.cnpj;
    }
}
