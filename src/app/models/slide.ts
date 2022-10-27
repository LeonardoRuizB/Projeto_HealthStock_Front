export interface ISlide {
    title: string;
    date: string;
    text: string;
    img: string;
}

export default class Slide implements ISlide {
    title: string;
    date: string;
    text: string;
    img: string;
  
    constructor(title:string, date:string, text:string, img:string){
      this.title = title;
      this.date = date;
      this.text = text;
      this.img = img;
    }
}