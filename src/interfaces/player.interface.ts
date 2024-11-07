import { ParseBetType } from "../types/parseBet.type";

export interface PlayerInterface {
  balance: number;
  name: string;
  makeBet(bet: ParseBetType): number | null;
  takeMoney(sum: number): void;
}
