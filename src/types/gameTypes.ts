export interface ProfitGainerVals {
  // seconds divided by 100 (don't ask)
  time: number;
  requiredAmount: number;
}

export interface CompostableQuizQuestion {
  itemName: string;
  // eslint-disable-next-line no-undef
  itemIcon: JSX.Element;
  isCompostable: boolean;
}
