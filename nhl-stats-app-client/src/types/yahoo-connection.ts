export interface YahooConnection {
  hasCode: boolean;
  isFulllyConnected: boolean;
  yahooResponseData?: YahooResponseData;
}

export interface YahooResponseDataPlayer {
  first: string;
  last: string;
  team: string;
  position: string;
}

export interface YahooResponseData {
  LK: {
    leaguesArr: { leagueKey: string; leagueName: string }[];
    leagueFound: boolean;
    error?: { description: string };
    errorMessage?: string;
  };
  myPlayers: {
    teamName: string;
    myPlayers: YahooResponseDataPlayer[];
  };
  takenPlayers: YahooResponseDataPlayer[];
  userInfo: {
    email: string;
    email_verified: boolean;
    family_name: string;
    gender: string;
    given_name: string;
    locale: string;
    name: string;
    nickname: string;
    error?: string;
    errorMessage?: string;
  };
}
