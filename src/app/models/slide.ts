export interface ISlide {
    title: string;
    date: number;
    text: string;
    img: string;
}

export default class Slide {
    title: string;
    date: number;
    text: string;
    img: string;
  
    constructor(title:string, date:number, text:string, img:string){
      this.title = title;
      this.date = date;
      this.text = text;
      this.img = img;
    }
}