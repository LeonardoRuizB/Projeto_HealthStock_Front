export interface ISlide {
    title: string;
    date: string;
    text: string;
    img: string;
    buttonMessage: string;
}

export default class Slide implements ISlide {
    title: string;
    date: string;
    text: string;
    img: string;
    buttonMessage: string;
  
    constructor(title:string, date:string, text:string, img:string, buttonMessage : string = "Saiba mais!"){
      this.title = title;
      this.date = date;
      this.text = text;
      this.img = img;
      this.buttonMessage = buttonMessage;
    }

    static makeSlides(){
      return [
        new Slide("HealthStock", 'Uma nova forma manter o estoque', "Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim.Quem num gosta di mé, boa gentis num é.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.", "backgrounds/background1.jpg", "Venha conhecer a plataforma!"),
        new Slide("Marketplace", 'Uma solução pensada para você', "Uma platforma segura para compra de itens hospitaláres.", "backgrounds/background2.jpg", "Saiba mais como comprar nossos produtos!"),
        new Slide("Venda seus produtos aqui", '2026', "Com um grande número de compradores, venha fazer parte da história e venda seus produtos aqui. Conheça nossos estudos de caso e descobra como podemos aumentar suas vendas!", "backgrounds/background3.jpg", "Saiba mais sobre vendas")
      ];
    }
}