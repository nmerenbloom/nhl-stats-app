import { PlayerStats } from '../../../types/player-stats';
import { AppState } from '../../../types/state';
import {
  YahooResponseData,
  YahooResponseDataPlayer,
} from '../../../types/yahoo-connection';

export const integrateYahooData = (
  yrd: YahooResponseData,
  state: AppState
): PlayerStats[] => {
  const myPlayers = yrd.myPlayers.myPlayers;
  const takenPlayers = yrd.takenPlayers;

  return state.playerStats.allPlayers.map((currPlayer) => {
    return {
      ...currPlayer,
      isMyPlayer: isPlayerMatch(currPlayer, myPlayers),
      isTakenPlayers: isPlayerMatch(currPlayer, takenPlayers),
    };
  });
};

const isPlayerMatch = (
  appPlayer: PlayerStats,
  searchArr: YahooResponseDataPlayer[]
): boolean => {
  const r = searchArr.some((searchArrPlayer) => {
    return (
      searchArrPlayer.first === appPlayer.firstname &&
      searchArrPlayer.last === appPlayer.lastname &&
      appPlayer.team === searchArrPlayer.team
    );
  });
  return r;
};
