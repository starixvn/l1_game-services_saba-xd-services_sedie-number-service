import { BET_CHOICES } from "../constants";

export const roundBetPercentage = (betPercentage: Record<string, number>) => {
  betPercentage[BET_CHOICES.odd] && (betPercentage[BET_CHOICES.odd] = parseInt(betPercentage[BET_CHOICES.odd].toString()));
  if (betPercentage[BET_CHOICES.even] > 0) {
    betPercentage[BET_CHOICES.even] = 100 - (betPercentage[BET_CHOICES.odd] ?? 0);
  }

  return betPercentage;
};
