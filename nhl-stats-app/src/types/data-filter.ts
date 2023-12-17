import { StatCategories } from './constants';
import { PlayerStats } from './player-stats';

export interface DataFilters {
  isAverages: boolean;
  sortOrder: SortOrderObj[];
  numericFilters: NumericFilterObj[];
  showOnlyAvailableSkaters: boolean;
}

export interface SortOrderObj {
  stat: StatCategories;
  digitsPastDecimalPoint: number;
}

export interface NumericFilterObj {
  stat: StatCategories;
  operator: Operaters;
  value?: number | string;
}

export interface SavedQuery {
  name: string;
  df: DataFilters;
  isEdit: boolean;
}

export type Operaters = '>' | '=';
