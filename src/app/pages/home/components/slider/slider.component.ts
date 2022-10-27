import { Component, OnInit } from '@angular/core';
import Slide from 'src/app/models/slide';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
	
	slideIndex : number = 0;
	mainSlide : Slide | undefined;
	slides : Slide[];
	interval : any | undefined;
	timeLeft: number = 60;
	
	constructor() {
		this.slides = [
			this.slide("Natural Environment", 2027, "Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim.Quem num gosta di mé, boa gentis num é.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.", "backgrounds/background1.jpg"),
		  this.slide("Family House", 2025, "Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis.Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.", "backgrounds/background2.jpg"),
		  this.slide("Modern Architecture", 2026, "Si num tem leite então bota uma pinga aí cumpadi!Viva Forevis aptent taciti sociosqu ad litora torquent.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!", "backgrounds/background3.jpg")
		];
	}
	
	ngOnInit(): void {
		try {
			this.showSlide(this.slides[this.slideIndex]);
			this.startTimer();
		} catch (err) {
			console.warn(err);
		}
	}

	slide(title:string, date:number, text:string, img:string){
		return new Slide(title, date, text, img);
	}

	showSlide(slide: Slide){
		var mainMessage = this.findElementBy('article-body');
	
		this.mainSlide = slide;
	
		//mainMessage.getElementsByTagName('h3')[0].textContent = slide.date.toString();
		//mainMessage.getElementsByTagName('h1')[0].textContent = slide.title;
		//mainMessage.getElementsByTagName('p')[0].textContent = slide.text;
		
		mainMessage.style.backgroundImage = `url('assets/${ slide.img}')`;
	}

	findElementBy(id:string){
		let element = document.getElementById(id);
		  	if(!element)
				throw new Error(id + " is not find");
		  	return element;
	}

	startTimer() {
		this.interval = setInterval(() => {
			this.nextSlide();
		},6000)
	}

	nextSlide(){
		if(this.slideIndex < this.slides.length - 1){
			this.showSlide(this.slides[++this.slideIndex]); 
			this.playAnimation(this.findElementBy('main-message'),'fadeOut');
		} else {
			this.slideIndex = -1;
			this.showSlide(this.slides[++this.slideIndex]); 
			this.playAnimation(this.findElementBy('main-message'),'fadeOut');
		}
	}

	playAnimation(element : HTMLElement = document.createElement('p'), animationName:string){
		if(element.classList.contains(animationName))
			element.classList.remove(animationName); 
	
		void element.offsetWidth;
		element.classList.add(animationName);  
	}
}
