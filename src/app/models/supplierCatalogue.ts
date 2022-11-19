import { Photo } from "./photo";

export interface ISupplierCatogue {
    id: number;
    name: string;
    description: string;
    photo: Photo
    photos: Photo[]
    supplierId: number;
    packageTypeId : number;
    productId: number;
    price : number;
}