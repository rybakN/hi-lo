import { ColorEnum } from "../types/color.enum";

export const colorText = (text: string, color: ColorEnum) => {
  switch (color) {
    case ColorEnum.red:
      return `\x1B[31m${text}\x1B[0m`;
    case ColorEnum.green:
      return `\x1B[32m${text}\x1B[0m`;
    case ColorEnum.yellow:
      return `\x1B[33m${text}\x1B[0m`;
    default:
      return null;
  }
};
