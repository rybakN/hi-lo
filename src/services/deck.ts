import { CardType } from "../types/card.type";
import { DeckInterface } from "../interfaces/deck.interface";

export class Deck implements DeckInterface {
  private ranks: string[];
  private suits: string[] = ["♠", "♥", "♦", "♣"];
  private readonly cards: Array<CardType> = [];

  constructor(numDecks: number = 6) {
    this.ranks = [...Array(9).keys()]
      .map((i) => (i + 2).toString())
      .concat(["J", "Q", "K", "A"]);
    this.cards = this.createDeck(numDecks);
  }

  public getRandomCard(): CardType {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards[randomIndex];
  }

  private createDeck(numDecks: number): Array<CardType> {
    const deck: Array<CardType> = [];
    for (let i = 0; i < numDecks; i++) {
      for (const suit of this.suits) {
        this.ranks.forEach((rank, index) => {
          deck.push({ rankIndex: index, cardName: `${rank}${suit}` });
        });
      }
    }
    return deck;
  }
}
