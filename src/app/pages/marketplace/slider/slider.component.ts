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
	
	constructor() {
		this.slides = Slide.makeSlides();
	}
	
	ngOnInit(): void {
		try {
			this.showSlide(this.slides[this.slideIndex]);
			this.startSlideLoop();
		} catch (err) {
			console.warn(err);
		}
	}

	showSlide(slide: Slide){
		var mainMessage = this.findElementBy('section-body');
	
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

	startSlideLoop() {
		setInterval(() => {
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

	playAnimation(element : HTMLElement, animationName:string){
		if(element.classList.contains(animationName))
			element.classList.remove(animationName); 
	
		void element.offsetWidth;
		element.classList.add(animationName);  
	}
}
