import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showMessage(message:string){
    let messageBody = this.createMessage(message);
    let notificationTag = this.findElementBy('notification');

    notificationTag.append(messageBody);
    this.playAnimation(messageBody, 'fadeIn');

    setInterval(() => {
      this.playAnimation(messageBody, 'fadeOut');
      messageBody.onanimationend = () => {
        notificationTag.firstElementChild?.remove()
      }
    }, 5000);

    


  }

  findElementBy(id:string){
		let element = document.getElementById(id);
		  	if(!element)
				throw new Error(id + " is not find");
		  	return element;
	}

  createMessage(text : string){
    let messageBody = document.createElement('div');
    messageBody.classList.add('message-body');
    
    let p = document.createElement('p');
    p.textContent = text;

    messageBody.append(p);

    return messageBody;
  }

  playAnimation(element : HTMLElement, animationName:string){
		if(element.classList.contains(animationName))
			element.classList.remove(animationName); 
	
		void element.offsetWidth;
		element.classList.add(animationName);  
	}
}
