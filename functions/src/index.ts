import * as express from 'express';
import * as cors from 'cors';
import * as functions from 'firebase-functions';
// import { onRequest } from '../node_modules/firebase-functions/lib/v1/providers/https';
// import axios from '../node_modules/axios/index';
// import { logger } from '../node_modules/firebase-functions/lib/v1/index';
import {
  filterPipeline,
  getAverages,
  integrateYahooData,
  reIndex,
  sortByMultipleProperties,
} from './data-helpers/sorters';
import { getToken, storeToken } from './data-helpers/firebase-call';
import { playerStatsMapper } from './data-helpers/data-mapper';
import {
  getAccessTokenFromYahoo,
  getUserInfo,
  getLeagueInfo,
} from './data-helpers/yahoo-call';
import { RotoWirePlayerStats } from './types/player-stats';
import { NumericFilterObj, SortOrderObj } from './types/data-filters';
import axios from 'axios';

const yahooConsumerKey =
  'dj0yJmk9NjVFb2ttZ25WOThNJmQ9WVdrOVpHSmtjMXBLU2pjbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTA3';
const yahooConsumerSecret = '760c036befb96a9db85a72b3e525b215eb342cb5';

export const app = express();
app.use(cors());

app.post('/skaters-query', async (req, res) => {
  // keep for easier dev and remember to update
  // interface DataFilters {
  //   isAverages: boolean;
  //   sortOrder: StatCategories[];
  //   numericFilters: {stat: StateCategories, operator: ">", value: number}
  // }

  const isAverages: boolean = req.body.isAverages;
  const sortOrder: SortOrderObj[] = req.body.sortOrder;
  const numericFilters: NumericFilterObj[] = req.body.numericFilters;
  const showOnlyAvailable: boolean = req.body.showOnlyAvailableSkaters;
  const session_code: string | null = req.body.session;

  try {
    const r = await axios.get(
      'https://www.rotowire.com/hockey/tables/stats.php?pos=skater&season=2024'
    );
    const rotoWirePlayerData: RotoWirePlayerStats[] = r.data;

    const playerDataAvgOrTotal = isAverages
      ? getAverages(playerStatsMapper(rotoWirePlayerData), sortOrder)
      : playerStatsMapper(rotoWirePlayerData);

    const filtered = filterPipeline(playerDataAvgOrTotal, numericFilters);

    const integratedWithYahoo = session_code
      ? await integrateYahooData(filtered, session_code)
      : filtered;

    const filteredByStatus =
      session_code && showOnlyAvailable
        ? integratedWithYahoo.filter((p) => !p.isTakenPlayers)
        : integratedWithYahoo;

    const sorted = reIndex(
      filteredByStatus.sort(sortByMultipleProperties([...sortOrder]))
    );

    res.send(sorted);
  } catch (error: any) {
    console.log(error);
    res.send({
      errorMessage: error?.message ?? error ?? 'some errror index ln 96',
    });
  }
});
// end of main skater query POST

app.get('/test', async (req, res) => {
  try {
    console.log(req.query);
    // console.log('hit!!!!!!!!!!!');

    // const testToken = await getToken('ugbvdr7bpzvcnj8vhy76m5f52unssndm'); //good
    // if (!testToken) {
    //   res.send({ e: 'not found' });
    //   return;
    // }
    // const r = await axios.get(
    //   'https://www.rotowire.com/hockey/tables/stats.php?pos=skater&season=2023'
    // );
    // const rotoWirePlayerData = playerStatsMapper(r.data);

    // const y = await getTakenPlayers(testToken.t, '427.l.91469');

    // const finalResult = helperFn(rotoWirePlayerData, y);
    // res.send(finalResult);

    // res.send(testToken ?? 'undefined!!');
    res.send(req.params);
  } catch (error: any) {
    res.send({ errorMessage: error.message, code: error.name });
  }
});

app.get('/signin', (request, response) => {
  // const lang = navigator.language;
  const redirect = 'https://nhl-stats-client.web.app/';
  // const redirect = 'localhost:3000';
  const url = `https://api.login.yahoo.com/oauth2/request_auth_fe?client_id=${yahooConsumerKey}&response_type=code&redirect_uri=${redirect}`;
  response.send(url);
});

app.post('/resume-session', async (req, res) => {
  try {
    const session_code = req.body.session;
    console.log(session_code);
    if (!session_code || !(typeof session_code === 'string')) {
      throw new Error('Session Code not parsed from URL');
    }
    let firebaseTokenObj = await getToken(session_code);
    if (firebaseTokenObj === undefined) {
      throw new Error('Could not find session');
    }
    const access_token = firebaseTokenObj.t;
    const userInfo = await getUserInfo(access_token);
    const LK = await getLeagueInfo(access_token);
    res.send({ userInfo, LK });
  } catch (error: any) {
    res.send({ errorMessage: error.message });
  }
});

app.post('/init-yahoo', async (req, res) => {
  const authCode = req.body.code;

  try {
    const yahooAuthResponse = await getAccessTokenFromYahoo(
      authCode,
      yahooConsumerKey,
      yahooConsumerSecret
    );
    const access_token = yahooAuthResponse.access_token;
    const refresh_token = yahooAuthResponse.refresh_token;

    const userInfo = await getUserInfo(access_token);
    const LK = await getLeagueInfo(access_token);
    const leagueKey = LK.leaguesArr[0]?.leagueKey;
    await storeToken(
      access_token,
      refresh_token,
      userInfo.email,
      authCode,
      leagueKey
    );
    res.send({ userInfo, LK });
  } catch (error: any) {
    res.send({ errorMessage: error.message });
  }
});

// app.post('/init-yahoo', async (req, res) => {
//   const authCode = req.body.code;

//   const access_token = await getAccessTokenFromYahoo(
//     authCode,
//     yahooConsumerKey,
//     yahooConsumerSecret
//   );

//   const userInfo = await getUserInfo(access_token);

//   await storeToken(access_token, userInfo.email, authCode);

//   const LK = await getLeagueInfo(access_token); //LK.leagueKey!!!!!!!!!
//   if (LK.error) {
//     res.send(LK); // most likely error is that user has no leagues
//     return;
//   }

//   const takenPlayers = await getTakenPlayers(access_token, LK.leagueKey);
//   const myPlayers = await getMyPlayers(access_token, LK.leagueKey);

//   res.send({ userInfo, myPlayers, takenPlayers, LK });
// });

// exports.api = onRequest(app);
exports.api = functions.https.onRequest(app);
