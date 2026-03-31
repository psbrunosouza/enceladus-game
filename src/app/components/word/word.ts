import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-word',
  imports: [NgClass],
  templateUrl: './word.html',
  styleUrl: './word.css',
})
export class Word {
  word = input<string>('');
  locked = input<boolean>(false);
  hidden = input<boolean>(false);
  select = output<string>();

  handleSelect(): void {
    this.select.emit(this.word());
  }
}
