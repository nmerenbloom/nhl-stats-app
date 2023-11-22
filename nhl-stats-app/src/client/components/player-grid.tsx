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

export const PlayerGrid = () => {
  const { state, dispatch } = useCustomContext();

  // const onBtnClick = () => {
  //   const tooltipTriggerList = [].slice.call(
  //     document.querySelectorAll('[data-bs-toggle="tooltip"]')
  //   );
  //   tooltipTriggerList.map(function (tooltipTriggerEl) {
  //     return new Tooltip(tooltipTriggerEl).show();
  //   });
  // };

  // const offBtnClick = (event: any) => {
  //   console.log('off');

  //   Tooltip.getInstance('#idek')?.hide();
  //   // const tooltipTriggerList = [].slice.call(
  //   //   document.querySelectorAll('[data-bs-toggle="tooltip"]')
  //   // );
  //   // tooltipTriggerList.map(function (tooltipTriggerEl) {
  //   //   return new Tooltip(tooltipTriggerEl).hide();
  //   // });
  //   // tooltipTriggerList.map(function (tooltipTriggerEl) {
  //   //   return new Tooltip(tooltipTriggerEl).dispose();
  //   // });
  //   // tooltipTriggerList.map(function (tooltipTriggerEl) {
  //   //   return new Tooltip(tooltipTriggerEl).toggle();
  //   // });
  // };

  useEffect(() => {
    console.log(state.showGoToolTip);
    Tooltip.getInstance('[data-bs-toggle="tooltip"]')?.hide();
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    if (state.showGoToolTip) {
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl).show();
      });
      // setTimeout(() => {
      //   Tooltip.getInstance('[data-bs-toggle="tooltip"]')?.hide();
      //   console.log('hide');
      // }, 2500);
    } else {
      Tooltip.getInstance('[data-bs-toggle="tooltip"]')?.hide();
    }
    // }, [state.dataFilters]);
  }, [state]);

  const onGoClick = async () => {
    dispatch(toggleSpinnerAction(true));
    dispatch(await fetchPlayersAction(state));
  };

  const indexStart = state.pagination.currPage * PAGE_SIZE - PAGE_SIZE;
  const indexEnd = state.pagination.currPage * PAGE_SIZE;

  const playserSlice = state?.playerStats?.allPlayers?.slice(
    indexStart,
    indexEnd
  );

  return (
    <div className='container'>
      <div className='d-flex justify-content-between border border-secondary bg-secondary bg-gradient p-2'>
        <button
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='manual' //seemingly optional line
          title='Click Go to apply changes'
          className='text-start btn btn-success'
          onClick={() => onGoClick()}
        >
          Go
        </button>
        <SortOrderDropdown></SortOrderDropdown>
        <div className='btn-group'>
          <a
            onClick={() => {
              dispatch(
                editFiltersAction({ ...state.dataFilters, isAverages: true })
              );
              // onBtnClick();
            }}
            className={`${
              state.dataFilters.isAverages ? 'active' : ''
            } btn btn-primary`}
          >
            Averages
          </a>
          <a
            onClick={(e) => {
              dispatch(
                editFiltersAction({ ...state.dataFilters, isAverages: false })
              );
              // offBtnClick(e);
            }}
            className={`${
              state.dataFilters.isAverages ? '' : 'active'
            } btn btn-primary`}
          >
            Totals
          </a>
        </div>
      </div>
      <table className='border border-secondary table table-striped'>
        <thead>
          <th></th>
          {Object.values(StatCategories).map((cat) => {
            return <th>{cat}</th>;
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
