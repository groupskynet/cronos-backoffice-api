export type Currency = 'EUR' | 'USD' | 'COP' | 'PEN';

export type Money = {
  amount: number;
  currency: Currency;
};
