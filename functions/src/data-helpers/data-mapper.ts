import { PlayerStats, RotoWirePlayerStats } from '../types/player-stats';
import { YahooPlayerMapped } from '../types/yahoo-data';

export const playerStatsMapper = (
  input: RotoWirePlayerStats[]
): PlayerStats[] => {
  const map: { [key: string]: string } = {
    // RW: Y!
    ANH: 'ANA',
    CLS: 'CBJ',
    WAS: 'WSH',
    MON: 'MTL',
    LAK: 'LA',
    SJS: 'SJ',
    TBL: 'TB',
    NJD: 'NJ',
  };
  const k = Object.keys(map);
  return input.map((playerObj, i) => {
    let teamAbr = playerObj?.team?.match(/([A-Z])/g)?.join('') ?? 'ERR';

    if (k.includes(teamAbr)) {
      // console.log(`changing rw ${teamAbr} to YH! ${map[teamAbr]}`);
      teamAbr = map[teamAbr];
    }

    return {
      id: i,
      url: playerObj.url,
      firstname: playerObj.firstname,
      lastname: playerObj.lastname,
      player: playerObj.player,
      name: playerObj.name,
      team: teamAbr,
      position: playerObj.position,
      wins: parseInt(playerObj.wins),
      losses: parseInt(playerObj.losses),
      otl: parseInt(playerObj.otl),
      gaa: parseInt(playerObj.gaa),
      ga: parseInt(playerObj.ga),
      sa: parseInt(playerObj.sa),
      sv: parseInt(playerObj.sv),
      svPct: parseInt(playerObj.svPct),
      so: parseInt(playerObj.so),
      gp: playerObj.gp,
      goals: parseInt(playerObj.goals),
      assists: parseInt(playerObj.assists),
      points: parseInt(playerObj.points),
      plusMinus: parseInt(playerObj.plusMinus),
      pim: parseInt(playerObj.pim),
      shots: parseInt(playerObj.shots),
      gwg: parseInt(playerObj.gwg),
      ppGoals: parseInt(playerObj.ppGoals),
      ppAssists: parseInt(playerObj.ppAssists),
      shortHandedGoals: parseInt(playerObj.shortHandedGoals),
      shortHandedAssists: parseInt(playerObj.shortHandedAssists),
      hits: parseInt(playerObj.hits),
      blocks: parseInt(playerObj.blocks),
      goalieTime: parseInt(playerObj.goalieTime),
    };
  });
};

export const helperFn = (r: PlayerStats[], y: YahooPlayerMapped[]) => {
  const uniqueRotoAbbrevs = [
    ...new Set(
      r.map((item) => {
        let teamAbr = item?.team?.match(/([A-Z])/g)?.join('') ?? 'ERR';
        return teamAbr === 'FA' ? item.name : teamAbr;
      })
    ),
  ];
  const uniqueYahooAbbrevs = [...new Set(y.map((item) => item.team))];

  const b1 = new Set(uniqueYahooAbbrevs);
  return [...new Set(uniqueRotoAbbrevs.filter((x) => !b1.has(x)))];
};
