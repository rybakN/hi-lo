import { ParseBetType } from "../types/parseBet.type";

export const parseBet = (bet: string): ParseBetType => {
  const betArr = bet.split(" ");
  return { prediction: betArr[0], sum: +betArr[1] };
};
