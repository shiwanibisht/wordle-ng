import { Component, Input, OnInit } from '@angular/core';
import { LetterState } from '../letter-state';
import { Letter } from '../letter';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {
  @Input() wordLength?: Number;
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
    console.log("submit");
  }

}
