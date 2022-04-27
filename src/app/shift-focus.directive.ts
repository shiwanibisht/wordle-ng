import { Directive, ElementRef, HostListener, Input } from '@angular/core';


interface IDInfo {
  guessNumber: Number;
  index: Number;
};

@Directive({
  selector: '[appShiftFocus]'
})
export class ShiftFocusDirective {
  @Input() appShiftFocus!:Number;
  idRe:RegExp = /l-(\d)-(\d)/;

  constructor(private el: ElementRef) { }

  getLetterID(guessNumber:Number, index: Number): string {
    return `l-${guessNumber}-${index}`;
  }

  getNextLetterID(guessNumber:Number, currentIndex: Number): string | null {
    let nextIndex = currentIndex.valueOf() + 1;
    if (nextIndex > this.appShiftFocus) {
      return null;
    }
    return this.getLetterID(guessNumber, nextIndex);
  }

  getPreviousLetterID(guessNumber:Number, currentIndex: Number): string | null {
    let previousIndex = currentIndex.valueOf() - 1;
    if (previousIndex < 0) {
      return null;
    }

    return this.getLetterID(guessNumber, previousIndex);
  }

  getInputInElement(id: string): any {
    let element = document.getElementById(id);
    if (!element) {
      return null;
    }

    let inputs = element.getElementsByTagName('INPUT');
    if (inputs.length != 1) {
      return null;
    }

    return inputs[0];
  }

  getIDInfo(id: string): IDInfo | null {
    // We expect the ID to be in the following format:
    // 'l-{guess number}-{index}'
    let found = id.match(this.idRe);
    if (!found || found.length != 3) {
      return null;
    }

    return {
      guessNumber: Number(found[1]),
      index: Number(found[2])
    };
  }

  shiftFocusBackwardOneLetter() {
    let idInfo = this.getIDInfo(this.el.nativeElement.id);
    if (!idInfo) {
      return;
    }

    let previousId = this.getPreviousLetterID(idInfo.guessNumber, idInfo.index);
    if (!previousId) {
      return;
    }

    this.el.nativeElement.blur();
    this.getInputInElement(previousId)?.focus();
  }

  shiftFocusForwardOneLetter() {
    let idInfo = this.getIDInfo(this.el.nativeElement.id);
    if (!idInfo) {
      return;
    }
    let nextId = this.getNextLetterID(idInfo.guessNumber, idInfo.index);
    if (!nextId) {
      return;
    }

    // We will be removing focus from this element.
    this.el.nativeElement.blur();
    this.getInputInElement(nextId)?.focus();
  }

  shiftFocusToNextGuess() {
    let idInfo = this.getIDInfo(this.el.nativeElement.id)
    if (!idInfo) {
      return;
    }

    let nextId = this.getLetterID(idInfo.guessNumber.valueOf() + 1, 0);
    console.log(nextId);
    if (!nextId) {
      return;
    } 

    let n = this.getInputInElement(nextId);

    if (n.disabled) {
      console.log('disabled');
      return;      
    }
    this.el.nativeElement.blur();
    console.log(n);
    n?.focus();
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    if (event.data != null) {
      this.shiftFocusForwardOneLetter();
    }
  }

  @HostListener('keydown.backspace')
  onBackspace() {
    this.shiftFocusBackwardOneLetter();
  }

  @HostListener('keyup.enter')
  onEnter() {
    console.log('here');
    this.shiftFocusToNextGuess();
  }
}
