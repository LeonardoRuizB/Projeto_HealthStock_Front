import { IBaseUser } from "./user";

export default class Buyer implements IBaseUser {
    id: number;
    companyName: string;

    constructor(data : any){
        this.id = data.id;
        this.companyName = data.companyName;
    }
}