import { StatCategories } from './player-stats';

export interface NumericFilterObj {
  stat: StatCategories;
  operator: Operaters;
  value: number | string;
}

export interface SortOrderObj {
  stat: StatCategories;
  digitsPastDecimalPoint: number;
}

export type Operaters = '>' | '=';
