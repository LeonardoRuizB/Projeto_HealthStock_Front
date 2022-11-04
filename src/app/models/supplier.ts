import { IBaseUser } from "./user";

export default class Supplier implements IBaseUser {
    companyName: string;

    constructor(data : any){
        this.companyName = data.companyName;
    }
}