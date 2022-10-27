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

    static makeSlides(){
      return [
        new Slide("HealthStock", 'Uma nova forma manter o estoque', "Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim.Quem num gosta di mé, boa gentis num é.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.", "backgrounds/background1.jpg"),
        new Slide("Family House", '2025', "Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis.Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.", "backgrounds/background2.jpg"),
        new Slide("Modern Architecture", '2026', "Si num tem leite então bota uma pinga aí cumpadi!Viva Forevis aptent taciti sociosqu ad litora torquent.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!", "backgrounds/background3.jpg")
      ];
    }
}