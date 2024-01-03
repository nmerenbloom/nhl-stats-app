import { useEffect, useRef } from 'react';
import { PAGE_SIZE, StatCategories } from '../../types/constants';
import { PlayerStats } from '../../types/player-stats';
import { useCustomContext } from '../state-management/app-context';
import { Pagination } from './pagination';
import { Tooltip } from 'bootstrap'; // Import Bootstrap's Tooltip class
import {
  editFiltersAction,
  fetchPlayersAction,
  toggleSpinnerAction,
} from '../state-management/actions';
import { SortOrderDropdown } from './sort-order-dropdown';
import { FiltersBar } from './filters-bar';
import { YahooConnectButton } from './yahoo-connect-btn';

export const PlayerGrid = () => {
  const { state, dispatch } = useCustomContext();

  const indexStart = state.pagination.currPage * PAGE_SIZE - PAGE_SIZE;
  const indexEnd = state.pagination.currPage * PAGE_SIZE;

  let playserSlice = state?.playerStats?.allPlayers?.slice(
    indexStart,
    indexEnd
  );

  // if (state.dataFilters.showOnlyAvailableSkaters) {
  //   playserSlice = playserSlice.filter((p) => !p.isTakenPlayers);
  // }

  const isYahooConnected = state.yahooConnection?.isFulllyConnected;
  const showStatus =
    (state.yahooConnection?.yahooResponseData?.LK?.leagueFound ?? false) &&
    isYahooConnected;

  return (
    <div className='container'>
      <YahooConnectButton></YahooConnectButton>
      <FiltersBar></FiltersBar>
      <table className='border border-secondary table table-striped'>
        <thead>
          <tr>
            <th></th>
            <th>PLAYER</th>
            {showStatus ? <th>STATUS</th> : null}
            {/* <th>Team</th> */}
            {/* {Object.values(StatCategories).map((cat, i) => {
              return <th key={i}>{cat.toUpperCase()}</th>;
            })} */}
            <th>TEAM</th>
            <th>GP</th>
            <th>GOALS</th>
            <th>ASSISTS</th>
            <th>POINTS</th>
            <th>SHOTS</th>
            <th>HITS</th>
            <th>BLOCKS</th>
          </tr>
        </thead>
        <tbody>
          {playserSlice.map((p) => {
            let status = '';
            if (p.isTakenPlayers) {
              status = '<-->';
            }
            if (p.isMyPlayer) {
              status = 'X';
            }
            if (!p.isMyPlayer && !p.isTakenPlayers) {
              status = 'Available';
            }
            const row = (
              <tr key={p.id}>
                <td>{p.id + 1}</td>
                <td>
                  {p.player}- {p.position}
                </td>
                {showStatus ? <td>{status}</td> : null}
                <td>{p.team}</td>
                <td>{p.gp}</td>
                <td>{p.goals}</td>
                <td>{p.assists}</td>
                <td>{p.points}</td>
                <td>{p.shots}</td>
                <td>{p.hits}</td>
                <td>{p.blocks}</td>
              </tr>
            );
            return row;
          })}
        </tbody>
      </table>
      <Pagination></Pagination>
    </div>
  );
};
