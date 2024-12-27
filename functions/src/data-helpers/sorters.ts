import { NumericFilterObj, SortOrderObj } from '../types/data-filters';
import { PlayerStats } from '../types/player-stats';
import { YahooPlayerMapped } from '../types/yahoo-data';
import { getToken } from './firebase-call';
import { getTakenPlayers, getMyPlayers } from './yahoo-call';

export const reIndex = (players: PlayerStats[]): PlayerStats[] => {
  return players.map((p, i) => {
    return { ...p, id: i };
  });
};

export const getAverages = (
  playerStatsArray: PlayerStats[],
  roundingInfo: SortOrderObj[]
): PlayerStats[] => {
  const roundingMap = buildPlacesPastDecimalMap(roundingInfo);
  playerStatsArray.forEach((playerStats) => {
    const gp = playerStats.gp || 1;

    Object.keys(playerStats).forEach((key) => {
      if (key !== 'gp' && key !== 'id') {
        const val = playerStats[key as keyof PlayerStats];
        if (typeof val === 'number') {
          const granularity = roundingMap[key];
          // console.log(`${key}: ${granularity}`);
          const avg = parseFloat((val / gp).toFixed(granularity));
          (playerStats[key as keyof PlayerStats] as number) = avg;
        }
      }
    });
  });

  return playerStatsArray;
};

const buildPlacesPastDecimalMap = (x: SortOrderObj[]) => {
  let r: { [key: string]: number } = {};
  x.forEach((soo) => (r[soo.stat] = soo.digitsPastDecimalPoint));
  return r;
};

export const sortByMultipleProperties = (properties: SortOrderObj[]) => {
  const stats = properties.map((soo) => soo.stat);
  return (a: any, b: any) => {
    for (const property of stats) {
      if (a[property] < b[property]) {
        return 1; // Return a negative value if a should come before b
      } else if (a[property] > b[property]) {
        return -1; // Return a positive value if b should come before a
      }
      // If the current property is equal, move to the next property
    }
    return 0; // If all properties are equal, return 0
  };
};

const operators = {
  '>': (a: any, b: any) => a > b, //exists
  '>=': (a: any, b: any) => a >= b,
  '<': (a: any, b: any) => a < b,
  '<=': (a: any, b: any) => a <= b,
  '=': (a: any, b: any) => a === b, //exists
};

export const filterPipeline = (
  playerData: PlayerStats[],
  conditions: NumericFilterObj[]
) => {
  conditions.forEach((conditionObj) => {
    playerData = playerData.filter((currPlayer) => {
      return operators[conditionObj.operator](
        currPlayer[conditionObj.stat],
        conditionObj.value
      );
    });
  });
  return playerData;
};

export const integrateYahooData = async (
  players: PlayerStats[],
  session_code: string
) => {
  console.log(`integrating Yahoo Data for session code ${session_code}`);

  let firebaseTokenObj = await getToken(session_code);

  if (firebaseTokenObj === undefined) {
    throw new Error('Could not find session');
  }
  const access_token = firebaseTokenObj?.t;
  // console.log('GOT TOKEN ' + access_token);
  // const LK = await getLeagueInfo(access_token);
  // const leagueKey = LK.leaguesArr[0].leagueKey;
  const leagueKey = firebaseTokenObj?.league_key;
  // if (LK.error) {
  //   throw new Error(`${LK.errorMessage}. ${LK.error.description.slice(0, 33)}`);
  // }
  // if (!LK.leagueFound || !leagueKey) {
  //   return players;
  // }
  if (!leagueKey || leagueKey === 'Not Found') {
    return players;
  }
  const takenPlayers = await getTakenPlayers(access_token, leagueKey);
  const myPlayersRez = await getMyPlayers(access_token, leagueKey);
  const myPlayers = myPlayersRez.myPlayers;

  return players.map((currPlayer) => {
    return {
      ...currPlayer,
      isMyPlayer: isPlayerMatch(currPlayer, myPlayers),
      isTakenPlayers: isPlayerMatch(currPlayer, takenPlayers),
    };
  });
};

const isPlayerMatch = (
  appPlayer: PlayerStats,
  searchArr: YahooPlayerMapped[]
) => {
  const r = searchArr.some((searchArrPlayer) => {
    return (
      searchArrPlayer.first === appPlayer.firstname &&
      searchArrPlayer.last === appPlayer.lastname &&
      appPlayer.team === searchArrPlayer.team
    );
  });
  return r;
};
