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

  processKeyPress(event: KeyboardEvent): boolean {
    // Process backspace separately.
    if (event.key == "Backspace") {
      this.value = "";
      return true;
    }
    // Ignore any other keys that are longer than one
    // character or invalid.
    if (event.key.length != 1) {
      return false;
    }

    if (event.key.match(/[A-Za-z]/)) {
      this.value = event.key;
      return true;
    }
    return false;
  }
}
