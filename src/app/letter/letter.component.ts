import { Component, Input, OnInit } from '@angular/core';

import { LetterState } from '../letter-state';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {
  @Input() index!: Number;
  @Input() state: LetterState = LetterState.Unsubmitted;
  public value: string = '';

  constructor() {}

  ngOnInit(): void {
  }

  getFillColor(): string {
    switch (this.state) {
      case LetterState.NotPresent:
        return "grey";
      case LetterState.WrongLocation:
        return "yellow";
      case LetterState.RightLocation:
        return "green";
      case LetterState.Unsubmitted:
      default:
          return "white";
    }
  }

  processKeyPress(eventKey: string | null | undefined): boolean {
    // Process backspace separately.
    if (eventKey == "Backspace") {
      this.value = "";
      return true;
    }
    // Ignore any other keys that are longer than one
    // character or invalid.
    if (!eventKey || eventKey.length != 1) {
      return false;
    }

    if (eventKey.match(/[A-Za-z]/)) {
      this.value = eventKey;
      return true;
    }
    return false;
  }
}
