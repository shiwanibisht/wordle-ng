import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {
  @Input() wordLength?: Number;

  constructor() { }

  ngOnInit(): void {
  }

}
