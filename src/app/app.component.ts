import { Component } from '@angular/core';
import { JojoGotchi } from './classes/JojoGotchi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JojoGotchi';
  jojoGotchi: JojoGotchi;
  jojoGotchiBlinks: boolean;
  gazouilliSound = new Audio('.\\assets\\sounds\\gazouilliSound.mp3');
  babytchoukSound = new Audio('.\\assets\\sounds\\babytchoukSound.mp3');
  clickSound = new Audio('.\\assets\\sounds\\clickSound.mp3');

  constructor() {
    this.jojoGotchi = new JojoGotchi('JoJux');
  }

  ngOnInit(): void {
    this.jojoGotchiBlinks = false;
    this.setClickSoundBtn();
    this.animateJojoGotchi();
    this.setJojoGotchiSound();
  }

  getAudioBackgorund(): string {
    return './assets/sounds/johannes-bornlof-look-to-the-stars.mp3';
  }

  setClickSoundBtn(): void {
    const buttons = document.getElementsByTagName('button');
    const buttonsArray = Array.from(buttons);
    for (const button of buttonsArray) {
button.addEventListener('click', (e) => {
  this.clickSound.currentTime = 0;
  this.clickSound.play();
  button.style.backgroundColor = 'yellow';
  setTimeout(() => {
    button.style.backgroundColor = 'lightpink';
  }, 200);
});
    }
  }

  animateJojoGotchi(): void {
    const blinkTimer = setInterval(() => {
      this.jojoGotchiBlinks = !this.jojoGotchiBlinks;
    }, 1250);
  }

  setJojoGotchiSound(): void {
    const jojogotchi = document.getElementById('jojogotchi');
    jojogotchi.addEventListener('click', () => {
this.gazouilliSound.play();
    });
    jojogotchi.addEventListener('dblclick', () => {
      this.babytchoukSound.play();
          });
  }

  getHealth(): number {
 return this.jojoGotchi.getHealth();
  }

  getAge(): number {
    return this.jojoGotchi.getAge();
  }

  getDaysWording(): string {
   return this.jojoGotchi.getAge() == 0 ? 'jour' : 'jours';
  }

  getDictonWording(): string {
    const today = new Date();
    switch (today.getDay() - 1) {
      case 0:
        return 'Plus un citron est pressé, plus il se dépêche...';
      case 1:
        return 'Si la vie t\'apporte des citrons, cherches du sel et de la tequila!';
        case 2:
          return 'Il vaut mieux se tromper en allant de l\'avant que d\'avoir raison en reculant.';
      case 3:
        return 'Le bonheur c’est de continuer à désirer ce qu’on possède.';
        case 4:
          return 'Aimer, ce n\'est pas se regarder l\'un l\'autre, c\'est regarder ensemble dans la même direction.';
      case 5:
        return 'On appelle animaux domestiques, ceux qui se font servir par les hommes.';
        case 6:
          return 'L\'espérance est une force, la confiance un talisman.';
    }
  }

  setEatNotification() {

  }

  getJojoGotchiImgSrc(): string {
    if (this.jojoGotchi.getHealth() == 0) {
      return './assets/images/jojoGotchiDead-heart.png';
    }
    switch (this.jojoGotchi.getHealth() > 50) {
      case true:
        return this.jojoGotchiBlinks ? './assets/images/jojoGotchiHappyBlinking-heart.png' :
         './assets/images/jojoGotchiHappy-heart.png';
      case false:
        return this.jojoGotchiBlinks ? './assets/images/jojoGotchiSadBlinking-heart.png' :
         './assets/images/jojoGotchiSad-heart.png';
    }
  }
}
