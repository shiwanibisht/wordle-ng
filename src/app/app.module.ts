import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LetterComponent } from './letter/letter.component';
import { GuessComponent } from './guess/guess.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrimPipe } from './trim.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LetterComponent,
    GuessComponent,
    TrimPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
