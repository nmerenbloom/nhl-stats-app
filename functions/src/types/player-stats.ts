export enum StatCategories {
  // PLAYER_NAME = 'Player',
  TEAM = 'team',
  GAMES_PLAYED = 'gp',
  GOALS = 'goals',
  ASSISTS = 'assists',
  POINTS = 'points',
  SHOTS_ON_GOAL = 'shots',
  HITS = 'hits',
  BLOCKS = 'blocks',
}

export interface PlayerStats {
  id: number;
  url: string;
  firstname: string;
  lastname: string;
  player: string;
  name: string;
  team: string;
  position: string;
  wins: number;
  losses: number;
  otl: number;
  gaa: number;
  ga: number;
  sa: number;
  sv: number;
  svPct: number;
  so: number;
  gp: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  shots: number;
  gwg: number;
  ppGoals: number;
  ppAssists: number;
  shortHandedGoals: number;
  shortHandedAssists: number;
  hits: number;
  blocks: number;
  goalieTime: number;
  isMyPlayer?: boolean;
  isTakenPlayers?: boolean;
}

export interface RotoWirePlayerStats {
  id: string;
  url: string;
  firstname: string;
  lastname: string;
  player: string;
  name: string;
  team: string;
  position: string;
  wins: string;
  losses: string;
  otl: string;
  gaa: string;
  ga: string;
  sa: string;
  sv: string;
  svPct: string;
  so: string;
  gp: number;
  goals: string;
  assists: string;
  points: string;
  plusMinus: string;
  pim: string;
  shots: string;
  gwg: string;
  ppGoals: string;
  ppAssists: string;
  shortHandedGoals: string;
  shortHandedAssists: string;
  hits: string;
  blocks: string;
  goalieTime: string;
}
