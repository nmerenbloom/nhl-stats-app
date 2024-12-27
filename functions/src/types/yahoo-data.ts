export interface YahooPlayerResponse {}

export interface YahooPlayerMapped {
  first: string;
  last: string;
  team: string;
  position: string;
}

export interface YahooLeagueResponseObj {
  leaguesArr: YahooLeagueInfoObj[];
  leagueFound: boolean;
  error?: any;
  errorMessage?: string;
}

export interface YahooLeagueInfoObj {
  leagueKey: string;
  leagueName: string;
}
