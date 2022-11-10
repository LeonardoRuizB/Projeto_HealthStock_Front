export interface IPhoto {
    title : string;
    data : any;
    mimeType : string;
}

export class Photo implements IPhoto {
    title: string;
    data: any;
    mimeType: string;
    type : string;

    constructor(body : any){
        this.title = body.title;
        this.data = body.data;
        this.mimeType = body.mimeType;
        this.type = this.mimeType.split('/')[1];

    }

}