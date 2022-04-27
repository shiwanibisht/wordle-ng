import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LetterState } from '../letter-state';
import { GoalWord } from '../goal-word';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {
  @Input() guessNumber!: Number;
  @Input() wordLength!: Number;
  @Input() goal!: GoalWord;
  @Input() isActive!: boolean;
  @Output() isActiveChange = new EventEmitter<boolean>();
  guessForm!: FormGroup;
  letterStates: LetterState[] = [];

  constructor() {
  }

  ngOnInit(): void {
    let formControls: { [name: string]: FormControl} = {};
    for (let i = 0; i < this.wordLength; i++) {
      this.letterStates.push(LetterState.Unsubmitted);
      formControls[i.toString()] = new FormControl('');
    }
    this.guessForm = new FormGroup(formControls);
  }
 
  onSubmit(): void {
    // Concatenate together the guess.
    let guess = "";
    for (let i = 0; i < this.wordLength; i++) {
      guess = guess.concat(this.guessForm.value[i]);
    }

    if (guess.length != this.wordLength) {
      // Can't submit yet. Return early.
      return;
    }

    // Preemptively disable this guess and enable the
    // next guess.
    this.isActive = false;
    this.isActiveChange.emit(this.isActive);

    for (let i = 0; i < this.wordLength; i++) {
      let val = guess.charAt(i);
      if (this.goal?.getAt(i) == val) {
        this.letterStates[i] = LetterState.RightLocation;
      } else if (this.goal?.contains(val)) {
        this.letterStates[i] = LetterState.WrongLocation;
      } else {
        this.letterStates[i] = LetterState.NotPresent;
      }
    }
  }
}
