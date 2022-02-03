import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimPipe } from '../trim.pipe';
import { LetterComponent } from './letter.component';

describe('LetterComponent', () => {
  let component: LetterComponent;
  let fixture: ComponentFixture<LetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrimPipe, LetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ignores key presses longer than a character', () => {
    expect(component.processKeyPress("something long")).toBeFalse();
    expect(component.value).toBeFalsy();
  });

  it('ignores key presses that are null', () => {
    expect(component.processKeyPress(null)).toBeFalse();
    expect(component.value).toBeFalsy();
  });

  it('ignores key presses that are undefined', () => {
    expect(component.processKeyPress(undefined)).toBeFalse();
    expect(component.value).toBeFalsy();
  });

  it('ignores key presses that are not alphabetical', () => {
    expect(component.processKeyPress("1")).toBeFalse();
    expect(component.value).toBeFalsy();
  });

  it('processes key presses of uppercase letters', () => {
    expect(component.processKeyPress("A")).toBeTrue();
    expect(component.value.toUpperCase()).toEqual("A");
  });

  it('processes key presses of lowercase letters', () => {
    expect(component.processKeyPress("a")).toBeTrue();
    expect(component.value.toUpperCase()).toEqual("A");
  });

  it('processes backspace and removes value', () => {
    expect(component.processKeyPress("a")).toBeTrue();
    expect(component.value.toUpperCase()).toEqual("A");
    expect(component.processKeyPress("Backspace")).toBeTrue();
    expect(component.value).toBeFalsy();
  });

});
