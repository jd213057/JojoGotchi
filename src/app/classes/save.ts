import { JojoGotchi } from './JojoGotchi';

export class Save {
  id: number;
  lastTimePlayed: number;
  lastFoodEaten: number;
  lastTimeSlept: number;
  jojoGotchi: JojoGotchi;


  constructor( lastTimePlayed: number, lastFoodEaten: number, lastTimeSlept: number, jojoGotchi: JojoGotchi) {
this.id = Math.round(Math.random() * 500 + 1);
lastTimePlayed = lastTimePlayed;
lastFoodEaten = lastFoodEaten;
lastTimeSlept = lastTimeSlept;
this.jojoGotchi = jojoGotchi;
  }
}

