import { Photo } from "./photo";

export interface ISupplierCatogue {
    id: number;
    name: string;
    description: string;
    supplierId: number;
    photo: Photo
}