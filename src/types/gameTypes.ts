export interface ProfitGainerVals {
  // seconds divided by 100 (don't ask)
  time: number;
  requiredAmount: number;
}

export interface CompostableQuizQuestion {
  itemName: string;
  itemImage: string;
  isCompostable: boolean;
}
