import { Component, OnInit } from '@angular/core';
import { GoalWord } from './goal-word';
import { ShiftFocusDirective } from './shift-focus.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wordle-ng';
  numGuesses : Number = 6;
  guessActiveStates: boolean[] = [];
  goalWord: GoalWord = new GoalWord("bangs");

  constructor() {}

  ngOnInit(): void {
    // First guess is active.
    this.guessActiveStates.push(true);
    for (var i = 1; i < this.numGuesses; i++) {
      // Rest are inactive for now.
      this.guessActiveStates.push(false);
    }
  }

  changeGuessActiveStates(index: Number): void {
    // Set this guess to inactive.
    this.guessActiveStates[index.valueOf()] = false;

    // If there's a next valid guess, make it active.
    let next = index.valueOf() + 1;
    if (next < this.numGuesses) {
      this.guessActiveStates[next] = true;
      // This is really where I want to shift focus to the
      // next Guess, or otherwise listen to the same event
      // that triggers this function to happen in the directive.
    }
  }
}
 