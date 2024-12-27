import * as qs from 'qs';
import axios from 'axios';
import { XMLParser } from '../../node_modules/fast-xml-parser/src/fxp';
import {
  YahooLeagueInfoObj,
  YahooLeagueResponseObj,
  YahooPlayerMapped,
} from '../types/yahoo-data';
import { RECONN_REQ } from '../types/errors';
// import { FirebaseTokenObj } from '../types/firebase';

export const getLeagueInfo = async (
  access_token: string
): Promise<YahooLeagueResponseObj> => {
  console.log('Fetching League Key');

  try {
    const currUserLeagueKeyUrl =
      'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nhl;season=2024/leagues';
    const leagueKeyXml = await axios.get(currUserLeagueKeyUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const parser = new XMLParser();
    let data = parser.parse(leagueKeyXml.data);

    data = data?.fantasy_content?.users.user?.games?.game?.leagues ?? undefined;

    if (data === '') {
      //user is in 0 leagues
      return {
        leagueFound: false,
        leaguesArr: [{ leagueKey: 'Not Found', leagueName: 'Not Found' }],
      };
    }

    let leaguesArr: YahooLeagueInfoObj[] = [];
    data = data?.league ?? {};

    console.log(data);

    if (Array.isArray(data)) {
      //implying this user is in more than 1 league
      leaguesArr = data.map((l) => {
        return { leagueKey: l.league_key, leagueName: l.name };
      });
    } else {
      // implying user in exactly 1 league
      leaguesArr = [{ leagueKey: data?.league_key, leagueName: data?.name }];
    }
    return {
      leaguesArr: leaguesArr,
      leagueFound: leaguesArr.length > 0,
      error: undefined,
    };
  } catch (error: any) {
    return {
      ...(error?.response?.data ?? 'unknown error'),
      leaguesArr: [],
      leagueFound: false,
      errorMessage: 'Error getting League Key',
    };
  }
};

export const getTakenPlayers = async (
  access_token: string,
  league_id: string
): Promise<YahooPlayerMapped[]> => {
  console.log('Fetching Taken Players');

  let yahooPlayersResponse: any[] = [];
  let complete = false;
  let start = 0;

  while (!complete) {
    const fantasyApiUrl = `https://fantasysports.yahooapis.com/fantasy/v2/league/${league_id}/players;status=T;start=${start}`;

    const leagueKeyXml = await axios.get(fantasyApiUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const parser = new XMLParser();
    let data = parser.parse(leagueKeyXml.data);
    data = data.fantasy_content.league.players.player; //array of players

    yahooPlayersResponse = yahooPlayersResponse.concat(data);
    start += 25;

    if (!data) {
      complete = true;
      continue;
    }
    if (data && data.length < 25) {
      complete = true;
    }
  }

  yahooPlayersResponse = yahooPlayersResponse.filter((playerObj) => {
    return playerObj !== null && playerObj !== undefined;
  });

  const takenPlayersArr = yahooPlayersResponse.map((playerObj) => {
    return {
      first: playerObj.name.first,
      last: playerObj.name.last,
      team: playerObj.editorial_team_abbr,
      position: playerObj.primary_position,
    };
  });
  return takenPlayersArr;
};

export const getMyPlayers = async (
  access_token: string,
  league_key: string
): Promise<{ myPlayers: YahooPlayerMapped[]; teamName: string }> => {
  console.log('fetching my players');
  const fantasyApiUrl = `https://fantasysports.yahooapis.com/fantasy/v2/league/${league_key}/teams;use_login=1/players`;

  const leagueKeyXml = await axios.get(fantasyApiUrl, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const parser = new XMLParser();
  let data = parser.parse(leagueKeyXml.data);
  let myPlayersYahoo: any[] =
    data.fantasy_content.league.teams.team.players.player;
  const myTeamName: string = data.fantasy_content.league.teams.team.name;

  myPlayersYahoo = myPlayersYahoo.filter((playerObj) => {
    return playerObj !== null && playerObj !== undefined;
  });

  const myPlayersArr = myPlayersYahoo.map((playerObj) => {
    return {
      first: playerObj.name.first,
      last: playerObj.name.last,
      team: playerObj.editorial_team_abbr,
      position: playerObj.primary_position,
    };
  });
  return { myPlayers: myPlayersArr, teamName: myTeamName };
};

export const getUserInfo = async (access_token: string) => {
  console.log('Fetching Current User Info');
  try {
    const yahooApiUrl = 'https://api.login.yahoo.com/openid/v1/userinfo';
    const userInfoResponse = await axios.get(yahooApiUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return userInfoResponse.data;
  } catch (error: any) {
    console.log(error.response);
    return {
      error: error.response.statusText,
      errorMessage: 'Error getting User Info',
    };
  }
};

export const getAccessTokenFromYahoo = async (
  authCode: string,
  yahooConsumerKey: string,
  yahooConsumerSecret: string
): Promise<{ access_token: string; refresh_token: string }> => {
  const requestBody = {
    client_id: yahooConsumerKey,
    client_secret: yahooConsumerSecret,
    redirect_uri: 'https://nhl-stats-client.web.app/',
    code: authCode,
    grant_type: 'authorization_code',
  };
  const yahooApiUrl = 'https://api.login.yahoo.com/oauth2/get_token';
  let access_token = '';
  let refresh_token = '';
  try {
    const getTokenResponse = await axios.post(
      yahooApiUrl,
      qs.stringify(requestBody),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    access_token = getTokenResponse.data.access_token;
    refresh_token = getTokenResponse.data.refresh_token;

    // refresh_token = getTokenResponse.data.refresh_token;
  } catch (error: any) {
    console.log('Error at GetToken:');
    console.log(error.response.data);
    const e = new Error(
      `${error.response.data.error_description}. Reconnect to Yahoo!`
    );
    e.name = RECONN_REQ;
    throw e;
  }

  return { access_token: access_token, refresh_token: refresh_token };
};

export const refreshAccessTokenFromYahoo = async (
  refresh_token: string,
  yahooConsumerKey: string,
  yahooConsumerSecret: string
): Promise<{ access_token: string; refresh_token: string; error?: string }> => {
  const requestBody = {
    client_id: yahooConsumerKey,
    client_secret: yahooConsumerSecret,
    redirect_uri: 'https://nhl-stats-client.web.app/',
    refresh_token: refresh_token,
    grant_type: 'refresh_token',
  };
  const yahooApiUrl = 'https://api.login.yahoo.com/oauth2/get_token';
  let access_token = '';
  let refresh_token_new = '';
  try {
    const getTokenResponse = await axios.post(
      yahooApiUrl,
      qs.stringify(requestBody),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    access_token = getTokenResponse.data.access_token;
    refresh_token_new = getTokenResponse.data.refresh_token;

    // refresh_token = getTokenResponse.data.refresh_token;
  } catch (error: any) {
    console.log('Error at Refresh Token:');
    console.log(error.response.data);
    const e = new Error(
      `${error.response.data.error_description}. Reconnect to Yahoo!`
    );
    e.name = RECONN_REQ;
    throw e;
  }

  return { access_token: access_token, refresh_token: refresh_token_new };
};
