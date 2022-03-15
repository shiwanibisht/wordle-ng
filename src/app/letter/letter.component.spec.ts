import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LetterState } from '../letter-state';

import { TrimPipe } from '../trim.pipe';
import { LetterComponent } from './letter.component';

function makeInputKeyDownEvent(input: HTMLInputElement, 
                          keypress: string | undefined): void {
  input.dispatchEvent(new KeyboardEvent('keydown', {
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
    component.isActive = true;
    input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ignores key down longer than a character', fakeAsync(() => {
    makeInputKeyDownEvent(input, 'something long');

    fixture.detectChanges();
    tick();

    expect(input.value).toBeFalsy();
    expect(component.letter.value).toBeFalsy();
  }));

  it('ignores key down that are undefined', fakeAsync(() => {
    makeInputKeyDownEvent(input, undefined);

    fixture.detectChanges();
    tick();

    expect(input.value).toBeFalsy();
    expect(component.letter.value).toBeFalsy();
  }));

  it('ignores key down that are not alphabetical', fakeAsync(() => {
    makeInputKeyDownEvent(input, '1');

    fixture.detectChanges();
    tick();

    expect(input.value).toBeFalsy();
    expect(component.letter.value).toBeFalsy();
  }));

  it('processes key down of uppercase letters', fakeAsync(() => {
    makeInputKeyDownEvent(input, "A");

    fixture.detectChanges();
    tick();

    expect(input.value).toEqual("A");
    expect(component.letter.value.toUpperCase()).toEqual("A");
  })); 

  it('processes key down of lowercase letters', fakeAsync(() => {
    makeInputKeyDownEvent(input, "a");

    fixture.detectChanges();
    tick();

    expect(input.value).toEqual("A");
    expect(component.letter.value.toUpperCase()).toEqual("A");
  }));

  it('processes backspace and removes value', fakeAsync(() => {
    makeInputKeyDownEvent(input, "a");

    fixture.detectChanges();
    tick();

    expect(input.value).toEqual("A");
    makeInputKeyDownEvent(input, "Backspace");

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

  it('is disabled if the component isActive is false', fakeAsync(() => {
    component.isActive = false;

    fixture.detectChanges();
    tick();

    expect(input.disabled).toBeTrue();
  }));

});
