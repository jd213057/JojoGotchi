import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JojoGotchi';
  lastTimePlayed: number;
  lastFoodEaten: number;
  lastTimeSlept: number;
  actualTime: number;
  isWindowDisplayed: boolean;
  jojoGotchiAge: number;
  jojoGotchiBirthday: number;
  jojoGotchiHealth: number;
  jojoGotchiBlinks: boolean;
  jojoGotchiSleep = false;
  storyPart = 0;
  babyYodaPart = 0;
  australiaPart = 0;
  displayVaiselle = false;
  vaiselleResponse: string;
  displayBabyYoda = false;
  displayStory = false;
  displayAustraly = false;
  gazouilliSound = new Audio('.\\assets\\sounds\\gazouilliSound.mp3');
  babytchoukSound = new Audio('.\\assets\\sounds\\babytchoukSound.mp3');
  clickSound = new Audio('.\\assets\\sounds\\clickSound.mp3');
  eatSound = new Audio('.\\assets\\sounds\\eat.mp3');
  sleepingSound = new Audio('.\\assets\\sounds\\ronflement.mp3');

  constructor() {
    // localStorage.clear();
  }

  ngOnInit(): void {
    this.isWindowDisplayed = false;
    this.jojoGotchiBlinks = false;
    this.actualTime = this.getActualTime();
    this.setClickSoundBtn();
    this.animateJojoGotchi();
    this.setJojoGotchiSound();
    this.loadLocalStorage();
    this.updateJojoGotchiHealth();
    this.vaiselleResponse = this.buildVaiselleResponse();
    this.automaticlySave();
  }

  getActualTime(): number {
    const today = new Date();
    return today.getTime();
  }

  loadLocalStorage(): void {
    const today = new Date();
    if (localStorage.getItem('jojoGotchi') === null ||
     localStorage.getItem('jojoGotchi') === '' ||
      localStorage.getItem('jojoGotchi') === undefined) {
      this.lastTimeSlept = today.getTime();
      this.lastFoodEaten = today.getTime();
      this.jojoGotchiAge = 0;
      this.jojoGotchiBirthday = today.getTime();
      this.jojoGotchiHealth = 100;
    } else {
      this.lastTimePlayed = parseInt(localStorage.getItem('lastTimePlayed'), 10);
      this.lastFoodEaten = parseInt(localStorage.getItem('lastFoodEaten'), 10);
      this.lastTimeSlept = parseInt(localStorage.getItem('lastTimeSlept'), 10);
      this.jojoGotchiAge = parseInt(localStorage.getItem('age'), 10);
      this.jojoGotchiBirthday = parseInt(localStorage.getItem('birthday'), 10);
      this.jojoGotchiHealth = parseInt(localStorage.getItem('health'), 10);
    }
  }

  updateJojoGotchiHealth(): void {
    if (this.actualTime > this.lastFoodEaten  + (1000 * 3600 * 24)) {
      this.jojoGotchiHealth -= 10;
          }
    if (this.actualTime > this.lastTimeSlept  + (1000 * 3600 * 24)) {
      this.jojoGotchiHealth -= 10;
           }
  }

  automaticlySave(): void {
    setTimeout(() => {
      setInterval(() => {
        this.saveGame();
            }, 30000);
    }, 1000);
  }

  saveGame(): void {
    const today = new Date();
    const newAge = this.actualTime - this.jojoGotchiBirthday;
    const ageInDays = Math.floor(newAge / (60000 * 60 * 24));
    this.jojoGotchiAge = ageInDays;
    this.updateJojoGotchiHealth();
    const newLastTimePlayed = today.getTime();
    this.lastTimePlayed = newLastTimePlayed;
    localStorage.setItem('lastTimePlayed', this.lastTimePlayed.toString());
    localStorage.setItem('lastFoodEaten', this.lastFoodEaten.toString());
    localStorage.setItem('lastTimeSlept', this.lastTimeSlept.toString());
    localStorage.setItem('age', this.jojoGotchiAge.toString());
    localStorage.setItem('birthday', this.lastFoodEaten.toString());
    localStorage.setItem('health', this.lastTimeSlept.toString());
  }


  getAudioBackground(): string {
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
      this.gazouilliSound.currentTime = 0;
      this.gazouilliSound.play();
          });
    jojogotchi.addEventListener('dblclick', () => {
      this.babytchoukSound.currentTime = 0;
      this.babytchoukSound.play();
          });
  }

  getHealth(): number {
    return this.jojoGotchiHealth;
  }

  getAge(): number {
    return this.jojoGotchiAge;
  }

  getDaysWording(): string {
   return this.jojoGotchiAge === 0 ? 'jour' : 'jours';
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

  feedJojoGotchi(): void {
    setTimeout(() => {
      this.eatSound.currentTime = 0;
      this.eatSound.play();
    }, 2000);
    const feedingTime = new Date();
    this.lastFoodEaten = feedingTime.getTime();
    if (this.jojoGotchiHealth < 100 && this.jojoGotchiHealth > 90) {
      this.jojoGotchiHealth = 100;
    } else if (this.jojoGotchiHealth < 90) {
      this.jojoGotchiHealth += 10;
    }
      }

      bedJojoGotchi(): void {
        const sleepingTime = new Date();
        this.lastTimeSlept = sleepingTime.getTime();
        if (this.jojoGotchiHealth < 100 && this.jojoGotchiHealth > 90) {
          this.jojoGotchiHealth = 100;
        } else if (this.jojoGotchiHealth < 90) {
          this.jojoGotchiHealth += 10;
        }
        if (!this.jojoGotchiSleep) {
          this.jojoGotchiSleep = true;
          this.sleepingSound.play();
          this.sleepingSound.loop = true;
        } else if (this.jojoGotchiSleep) {
          this.jojoGotchiSleep = false;
          this.sleepingSound.pause();
          this.sleepingSound.currentTime = 0;
        }
          }

  getJojoGotchiImgSrc(): string {
    if (this.jojoGotchiHealth === 0) {
      return './assets/images/jojoGotchiDeadheart.png';
    }
    if (this.jojoGotchiSleep) {
      return './assets/images/jojoGotchiHappyBlinkingheart.png';
    }
    switch (this.jojoGotchiHealth > 50) {
      case true:
        return this.jojoGotchiBlinks ? './assets/images/jojoGotchiHappyBlinkingheart.png' :
         './assets/images/jojoGotchiHappyheart.png';
      case false:
        return this.jojoGotchiBlinks ? './assets/images/jojoGotchiSadBlinkingheart.png' :
         './assets/images/jojoGotchiSadheart.png';
    }
  }

  showWindow(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.isWindowDisplayed = true;
  }

  closeWindow(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.isWindowDisplayed = false;
  }

  buildVaiselleResponse(): string {
    const fileNumber = Math.round(Math.random() * 1000);
    return 'Le Dossier N°' + fileNumber +
    '  a été crée. Un technicien assermenté vous contactera dans les plus brefs délais.';
  }

  getBabyYodaImgSrc(part: number): string {
    switch (part) {
      case 0:
        return 'https://media.giphy.com/media/Ken6Yg5n7bYStW4JYB/giphy.gif';
      case 1:
        return 'https://media.giphy.com/media/ZFi2wFRs3lBvYNglWk/giphy.gif';
      case 2:
        return 'https://media.giphy.com/media/U4q2Ej2UEdq5mzpUCB/giphy.gif';
      case 3:
        return 'https://media.giphy.com/media/kI2hsMDS4zjK7Fbif8/giphy.gif';
      case 4:
        return 'https://media.giphy.com/media/KziKCpvrGngHbYjaUF/giphy.gif';
    }
  }

  onPreviousBabyYodaPart(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    if (this.babyYodaPart >= 1) {
      this.babyYodaPart --;
    }
  }

  onNextBabyYodaPart(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    if (this.babyYodaPart <= 3) {
      this.babyYodaPart ++;
    }
  }

  getStoryWording(part: number): string {
    switch (part) {
      case 0:
        return 'La Princesse au petit pois';
      case 1:
      return 'Il était une fois un prince qui voulait épouser une princesse, mais une vraie princesse. Il fit le tour de la Terre pour en trouver une mais il y avait toujours quelque chose qui clochait ; des princesses, il n\'en manquait pas, mais étaient-elles de vraies princesses ?';
      case 2:
        return 'C\'était difficile à apprécier ; toujours une chose ou l\'autre ne lui semblait pas parfaite. Il rentra chez lui tout triste, il aurait tant voulu rencontrer une véritable princesse.';
      case 3:
        return 'Un soir, par un temps affreux, éclairs et tonnerre, cascades de pluie que c\'en était effrayant, on frappa à la porte de la ville et le vieux roi lui-même alla ouvrir. C\'était une princesse qui était là, dehors. Mais grands dieux ! de quoi avait-elle l\'air dans cette pluie, par ce temps !';
      case 4:
        return 'L\'eau coulait de ses cheveux et de ses vêtements, entrait par la pointe de ses chaussures et ressortait par le talon… et elle prétendait être une véritable princesse !';
      case 5:
        return '« Nous allons bien voir ça », pensait la vieille reine, mais elle ne dit rien. Elle alla dans la chambre à coucher, retira toute la literie et mit un petit pois au fond du lit ; elle prit ensuite vingt matelas qu\'elle empila sur le petit pois et, par-dessus, elle mit encore vingt édredons en plumes d\'eider.';
      case 6:
        return 'C\'est là-dessus que la princesse devait coucher cette nuit-là. Au matin, on lui demanda comment elle avait dormi.';
      case 7:
        return '« Affreusement mal, répondit-elle, je n\'ai presque pas fermé l\'oeil de la nuit. Dieu sait ce qu\'il y avait dans ce lit. J\'étais couchée sur quelque chose de si dur que j\'en ai des bleus et des noirs sur tout le corps ! C\'est terrible ! »';
      case 8:
        return '';
      case 9:
        return 'Alors ils reconnurent que c\'était une vraie princesse puisque, à travers les vingt matelas et les vingt édredons en plumes d\'eider, elle avait senti le petit pois. Une peau aussi sensible ne pouvait être que celle d\'une authentique princesse.';
      case 10:
        return 'Le prince la prit donc pour femme, sûr maintenant d\'avoir trouvé une vraie princesse, et le petit pois fut exposé dans le cabinet des trésors d\'art, où l\'on peut encore le voir si personne ne l\'a emporté. Et ceci est une vraie histoire.';
      case 11:
      return '----------------------------------FIN----------------------------------';
      }
  }

  showStoryIllustration(): boolean {
    return this.storyPart === 8;
      }

      getStorySubLegend(): string {
if (this.storyPart === 8) {
  return 'La princesse au petit pois';
}
return;
      }

      onPreviousStoryPart(): void {
        this.clickSound.currentTime = 0;
        this.clickSound.play();
        if (this.storyPart >= 1) {
          this.storyPart --;
        }
      }

      onNextStoryPart(): void {
        this.clickSound.currentTime = 0;
        this.clickSound.play();
        if (this.storyPart <= 10) {
          this.storyPart ++;
        }
      }

  getAustraliaImgSrc(part: number): string {
switch (part) {
  case 0:
    return './assets/images/Brisbane.jpg';
  case 1:
    return './assets/images/brisbane2.jpg';
  case 2:
    return './assets/images/redcenter.jpg';
  case 3:
    return './assets/images/heartreef.png';
  case 4:
    return './assets/images/hamiltonisland.jpg';
}
  }

  getAustraliaSubLegend(part: number): string {
switch (part) {
  case 0:
  case 1:
    return 'Brisbane, Australia';
  case 2:
    return 'Red Center, Australia';
  case 3:
    return 'Heart Reef, Australia';
  case 4:
    return 'Hamilton Island, Australia';
}
  }

  onPreviousAustraliaPart(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    if (this.australiaPart >= 1) {
      this.australiaPart --;
    }
  }

  onNextAustraliaPart(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    if (this.australiaPart <= 3) {
      this.australiaPart ++;
    }
  }

  showVaiselle(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.displayVaiselle = true;
  }

  hideVaiselle(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.displayVaiselle = false;
  }

  showBabyYoda(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.displayBabyYoda = true;
  }

  hideBabyYoda(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.displayBabyYoda = false;
    this.babyYodaPart = 0;
  }

  showStory(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.displayStory = true;
  }

  hideStory(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.displayStory = false;
    this.storyPart = 0;
  }

  showAustraly(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.displayAustraly = true;
  }

  hideAustraly(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.displayAustraly = false;
    this.australiaPart = 0;
  }
}
