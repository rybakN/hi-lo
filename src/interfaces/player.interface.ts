import { ParseBetType } from "../types/parseBet.type";

export interface PlayerInterface {
  makeBet(bet: ParseBetType): number | null;
  takeMoney(sum: number): void;
}
