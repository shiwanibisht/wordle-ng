import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LetterState } from '../letter-state';

import { TrimPipe } from '../trim.pipe';
import { LetterComponent } from './letter.component';

function makeInputKeypress(input: HTMLInputElement, 
                          keypress: string | undefined): void {
  input.dispatchEvent(new KeyboardEvent('keypress', {
    key: keypress,
  }));
}

describe('LetterComponent', () => {
  let component: LetterComponent;
  let fixture: ComponentFixture<LetterComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrimPipe, LetterComponent ],
      imports: [FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterComponent);
    component = fixture.componentInstance;
    component.letter = {value: "", state: LetterState.Unsubmitted};
    input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
    input.focus();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ignores key presses longer than a character', fakeAsync(() => {
    makeInputKeypress(input, 'something long');

    fixture.detectChanges();
    tick();

    expect(input.value).toBeFalsy();
    expect(component.letter.value).toBeFalsy();
  }));

  it('ignores key presses that are undefined', fakeAsync(() => {
    makeInputKeypress(input, undefined);

    fixture.detectChanges();
    tick();

    expect(input.value).toBeFalsy();
    expect(component.letter.value).toBeFalsy();
  }));

  it('ignores key presses that are not alphabetical', fakeAsync(() => {
    makeInputKeypress(input, '1');

    fixture.detectChanges();
    tick();

    expect(input.value).toBeFalsy();
    expect(component.letter.value).toBeFalsy();
  }));

  it('processes key presses of uppercase letters', fakeAsync(() => {
    makeInputKeypress(input, "A");

    fixture.detectChanges();
    tick();

    expect(input.value).toEqual("A");
    expect(component.letter.value.toUpperCase()).toEqual("A");
  })); 

  it('processes key presses of lowercase letters', fakeAsync(() => {
    makeInputKeypress(input, "a");

    fixture.detectChanges();
    tick();

    expect(input.value).toEqual("A");
    expect(component.letter.value.toUpperCase()).toEqual("A");
  }));

  it('processes backspace and removes value', fakeAsync(() => {
    makeInputKeypress(input, "a");

    fixture.detectChanges();
    tick();

    expect(input.value).toEqual("A");
    makeInputKeypress(input, "Backspace");

    fixture.detectChanges();
    tick();

    expect(input.value).toBeFalsy();
    expect(component.letter.value).toBeFalsy();
  }));

  it('is initially created with a grey background color', () => {
    expect(input.style.backgroundColor).toEqual('white');
  });

  it('has a grey background color if the letter is not present', fakeAsync(() => {
    component.letter = {value: "a", state: LetterState.NotPresent};
    
    fixture.detectChanges();
    tick();

    expect(input.style.backgroundColor).toEqual('grey');
  }));

  it('has a yellow background color if the letter is in the wrong location', fakeAsync(() => {
    component.letter = {value: "a", state: LetterState.WrongLocation};
    
    fixture.detectChanges();
    tick();

    expect(input.style.backgroundColor).toEqual('yellow');
  }));

  it('has a green background color if the letter is in the right location', fakeAsync(() => {
    component.letter = {value: "a", state: LetterState.RightLocation};
    
    fixture.detectChanges();
    tick();

    expect(input.style.backgroundColor).toEqual('green');
  }));

  it('is initially enabled for input', () => {
    expect(input.disabled).toBeFalse();
  });

  it('is disabled for input with any submitted state', fakeAsync(() => {
    const submittedStates = [LetterState.NotPresent, LetterState.RightLocation, LetterState.WrongLocation];

    for (var submittedState of submittedStates) {
      component.letter = {value: "a", state: submittedState};

      fixture.detectChanges();
      tick();

      expect(input.disabled).toBeTrue();
    }
  }));

});
