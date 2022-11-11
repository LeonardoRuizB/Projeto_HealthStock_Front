import address from "./address";
import contact from "./contact";
import { IBaseUser } from "./user";

export default class Supplier implements IBaseUser {
    id: number;
    companyName: string;
    cnpj: string;
    cnae: string;
    addresses: address[];
    contacts: contact[];


    constructor(data : any){
        this.id = data.id;
        this.companyName = data.companyName;
        this.cnpj = data.cnpj;
        this.cnae = data.cnae;
        this.addresses = data.addresses;
        this.contacts = data.contacts;
    }
}
