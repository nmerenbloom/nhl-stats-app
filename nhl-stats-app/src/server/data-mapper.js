// import { PlayerStats, PlayerStatsRestResponse } from '../types/player-stats';

const playerStatsMapper = (
  input
) => {
  return input.map((playerObj) => {
    return {
      id: parseInt(playerObj.id),
      url: playerObj.url,
      firstname: playerObj.firstname,
      lastname: playerObj.lastname,
      player: playerObj.player,
      name: playerObj.name,
      team: playerObj.team,
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
      gp: parseInt(playerObj.gp),
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

module.exports = playerStatsMapper