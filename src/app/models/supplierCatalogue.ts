import { Photo } from "./photo";
import { IProduct } from "./product";

export interface ISupplierCatogue {
    id: number;
    name: string;
    description: string;
    photo: Photo
    photos: Photo[]
    supplierId: number;
    packageTypeId : number;
    productId: number;
    product: IProduct;
    price : number;
}