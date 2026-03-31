import { Component, computed, OnInit, signal } from '@angular/core';
import { Word } from '../../components/word/word';

@Component({
  selector: 'app-game',
  imports: [Word],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game implements OnInit {
  targetSentence = signal<string[]>(['you', 'are', 'a', 'wizard', 'harry']);
  availableWords = signal<string[]>(['you', 'wizard', 'a', 'are', 'harry', 'is']);
  sentenceSlots = signal<string[]>([]);
  attempts = signal<string[][]>([]);

  lockedWords = computed(() => {
    const target = this.targetSentence();
    const attempts = this.attempts();

    return new Set(attempts.flat().filter((word) => !target.includes(word)));
  });

  ngOnInit(): void {
    this.startSentenceSlots();
  }

  startSentenceSlots(): void {
    this.sentenceSlots.set(Array(this.targetSentence().length).fill(''));
  }

  selectWord(selected: string): void {
    const slots = this.sentenceSlots();
    const emptySlotIndex = slots.findIndex((emptySlot) => !emptySlot);
    slots[emptySlotIndex] = selected;
    this.sentenceSlots.set(slots);
  }

  checkLockedWords(word: string): boolean {
    const sentence = this.sentenceSlots();

    return sentence.includes(word);
  }

  checkLockedWordsByAttempts(word: string): boolean {
    const attempts = this.attempts();
    const target = this.targetSentence();

    return attempts.some((attempt) => attempt.some((word) => !target.includes(word)));
  }

  removeWord(word: string, index: number): void {
    if (word) {
      const slots = this.sentenceSlots();
      slots[index] = '';
      this.sentenceSlots.set(slots);
    }
  }

  confirm(): void {
    const sentenceSlots = this.sentenceSlots();
    const isFilledSlot = sentenceSlots.every((slot) => slot);

    if (isFilledSlot) {
      this.attempts.update((prev) => [...prev, [...sentenceSlots]]);

      console.log(this.attempts());
      console.log(this.lockedWords());

      this.startSentenceSlots();
    }
  }
}
