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

  constructor() {}

  getHealth(): number {
 return this.jojoGotchi.getHealth();
  }

  setEatNotification() {

  }
}
