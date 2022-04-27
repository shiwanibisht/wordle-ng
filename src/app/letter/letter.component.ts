import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { LetterState } from '../letter-state';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LetterComponent),
      multi: true
    }
  ]
})
export class LetterComponent implements ControlValueAccessor {
  @Input() letterState!: LetterState;
  @Input() isActive!: boolean;
  value: string = '';
  onChange: any = () => {}
  onTouch: any = () => {}

  constructor() {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(input: string) {
    this.value = input.toLowerCase();
  }

  getFillColor(): string {
    switch (this.letterState) {
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

  processKeyDown(eventKey: string | null | undefined): boolean {
    // Process backspace separately.
    if (eventKey == "Backspace" || eventKey?.match(/[A-Za-z]/)) {
      return true;
    }
    return false;
  }
}
