import { ParseBetType } from "./parseBet.type";

export interface PlayerBetEntity extends ParseBetType {
  createAt: number;
  name: string;
}
