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

  const playserSlice = state?.playerStats?.allPlayers?.slice(
    indexStart,
    indexEnd
  );

  return (
    <div className='container'>
      {state.yahooConnection.isFulllyConnected ? (
        <p>Hello, {state.yahooConnection.email}</p>
      ) : (
        <YahooConnectButton></YahooConnectButton>
      )}
      {/* <button
        onClick={async () => await doYahooEx1()}
        className='btn btn-success'
      >
        Fetch My Players
      </button> */}
      <FiltersBar></FiltersBar>
      <table className='border border-secondary table table-striped'>
        <thead>
          <th></th>
          <th>PLAYER</th>
          {/* <th>Team</th> */}
          {Object.values(StatCategories).map((cat) => {
            return <th>{cat.toUpperCase()}</th>;
          })}
        </thead>
        <tbody>
          {playserSlice.map((p) => {
            const row = (
              <tr key={p.id}>
                <td>{p.id + 1}</td>
                <td>{p.player}</td>
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
