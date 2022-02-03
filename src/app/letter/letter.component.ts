import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {
  @Input() index!: Number;
  public value: string = '';

  constructor() {}

  ngOnInit(): void {
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
