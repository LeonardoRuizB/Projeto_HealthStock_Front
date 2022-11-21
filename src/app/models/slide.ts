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
        new Slide(" 3 Motivos para utilizar a HealthStock ", '', "Nossa empresa é altamente conceituada, e estamos a cada dia desenvolvendo nossos serviços. ", "backgrounds/background4.jpg", "Venha conhecer a plataforma!"),
        new Slide(" Agilidade", ' 1 - Motivo', " Nossos fornecedores possuem uma rede de entregas, oferecendo um prazo de entrega conveniente. ", "backgrounds/background5.jpg", "Venha conhecer a plataforma!"),
        new Slide(" Diversidade", '2 - Motivo ', " Nossa plataforma possui a mais variada gama de produtos, visando oferecer a maior variedade de opções para nossos consumidores e clientes.", "backgrounds/background2.jpg", "Saiba mais como comprar nossos produtos!"),
        new Slide(" Confiabilidade", '3 - Motivo', "Uma plataforma segura para comprar seus produtos, seja para uso pessoal, ou para fornecimento da sua empresa. ", "backgrounds/background3.jpg", "Saiba mais sobre vendas")
      ];
    }
}
