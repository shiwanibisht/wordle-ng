import { Component } from '@angular/core';
import { GoalWord } from './goal-word';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordle-ng';
  numGuesses : Number = 5;
  goalWord: GoalWord = new GoalWord("bangs");
}
 