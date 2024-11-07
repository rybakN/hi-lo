export const nameValidator = (name: string) => !!name.trim();
export const numberValidator = (balance: string) =>
  !isNaN(+balance) && +balance > 0;
export const betValidator = (bet: string) => /^(>|<)\s([1-9]\d*)$/.test(bet);
