export interface IProduct {
    id: number;
    name: string;
    description: string;
    productPhoto: IProductPhoto;
}

export interface IProductPhoto {
    id: number;
    title: string;
    path : string
}