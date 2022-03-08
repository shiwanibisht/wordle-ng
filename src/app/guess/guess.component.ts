import { Component, Input, OnInit } from '@angular/core';
import { LetterState } from '../letter-state';
import { Letter } from '../letter';
import { GoalWord } from '../goal-word';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {
  @Input() wordLength?: Number;
  @Input() goal?: GoalWord;
  letters: Letter[] = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < (this.wordLength || 0); i++) {
      this.letters.push({
        value: "",
        state: LetterState.Unsubmitted,
      });
    }
  }
 
  onSubmit(): void {
    for (let i = 0; i < (this.wordLength || 0); i++) {
      let val = this.letters[i].value;
      if (this.goal?.getAt(i) == val) {
        this.letters[i].state = LetterState.RightLocation;
      } else if (this.goal?.contains(val)) {
        this.letters[i].state = LetterState.WrongLocation;
      } else {
        this.letters[i].state = LetterState.NotPresent;
      }
    }
  }

}
