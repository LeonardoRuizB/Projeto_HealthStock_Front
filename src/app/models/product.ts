import { Photo } from "./photo";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    photo: Photo;
}