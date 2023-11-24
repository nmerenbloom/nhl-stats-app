import { StatCategories } from './constants';
import { PlayerStats } from './player-stats';

export interface DataFilters {
  isAverages: boolean;
  sortOrder: StatCategories[];
  numericFilters: NumericFilterObj[];
}

export interface NumericFilterObj {
  stat: StatCategories;
  operator: Operaters;
  value?: number | string;
}

export type Operaters = '>' | '=';

// const filterPipeline = (playerData: PlayerStats[], conditions: string[]) => {
//   conditions.forEach((conditionString) => {
//     playerData = playerData.filter((p) => {
//       return `${p.points} ${conditionString}`;
//     });
//   });
//   return playerData;
// };
