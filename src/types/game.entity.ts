import { CardType } from "./card.type";

export type GameEntity = {
  createAt: number;
  currentCard: CardType | null;
  nextCard: CardType | null;
  bet: string | null;
  isWin: boolean | null;
};
