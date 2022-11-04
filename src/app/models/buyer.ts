import { IBaseUser } from "./user";

export default class Buyer implements IBaseUser {
    companyName: string;

    constructor(data : any){
        this.companyName = data.companyName;
    }
}