import { CardType } from "../types/card.type";

export interface DeckInterface {
  getRandomCard(): CardType;
}
