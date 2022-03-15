import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LetterState } from '../letter-state';
import { Letter } from '../letter';
import { GoalWord } from '../goal-word';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {
  @Input() wordLength!: Number;
  @Input() goal!: GoalWord;
  @Input() isActive!: boolean;
  @Output() isActiveChange = new EventEmitter<boolean>();
  letters: Letter[] = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.wordLength; i++) {
      this.letters.push({
        value: "",
        state: LetterState.Unsubmitted,
      });
    }
  }
 
  onSubmit(): void {
    // Concatenate together the guess.
    let guess = "";
    for (let i = 0; i < this.wordLength; i++) {
      guess = guess.concat(this.letters[i].value);
    }

    if (guess.length != this.wordLength) {
      // Can't submit yet. Return early.
      return;
    }

    for (let i = 0; i < this.wordLength; i++) {
      let val = guess.charAt(i);
      if (this.goal?.getAt(i) == val) {
        this.letters[i].state = LetterState.RightLocation;
      } else if (this.goal?.contains(val)) {
        this.letters[i].state = LetterState.WrongLocation;
      } else {
        this.letters[i].state = LetterState.NotPresent;
      }
    }
    this.isActive = false;
    this.isActiveChange.emit(this.isActive);
  }
}
