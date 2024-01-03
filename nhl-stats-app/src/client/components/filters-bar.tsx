import { Tooltip } from 'bootstrap';
import { useEffect } from 'react';
import {
  editFiltersAction,
  fetchPlayersAction,
  saveQueryAction,
  toggleSpinnerAction,
} from '../state-management/actions';
import { useCustomContext } from '../state-management/app-context';
import { SortOrderDropdown } from './sort-order-dropdown';
import { NumbericFilterDropdown } from './numeric-filter-dropdown';

export const FiltersBar = () => {
  const { state, dispatch } = useCustomContext();
  const isYahooConnected = state.yahooConnection?.isFulllyConnected;
  const showCheckbox =
    (state.yahooConnection?.yahooResponseData?.LK?.leagueFound ?? false) &&
    isYahooConnected;

  const currDataFilters = state.dataFilters;

  useEffect(() => {
    // console.log(state.showGoToolTip);
    Tooltip.getInstance('[data-bs-toggle="tooltip"]')?.hide();
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    if (state.showGoToolTip) {
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl).show();
      });
    } else {
      Tooltip.getInstance('[data-bs-toggle="tooltip"]')?.hide();
    }
  }, [state]);

  const onGoClick = async () => {
    dispatch(toggleSpinnerAction(true));
    dispatch(await fetchPlayersAction(state));
  };

  return (
    <div className='d-flex align-items-center justify-content-between border border-secondary bg-secondary bg-gradient p-2'>
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
      {showCheckbox ? (
        <div className='form-check'>
          <input
            onClick={() =>
              dispatch(
                editFiltersAction({
                  ...state.dataFilters,
                  showOnlyAvailableSkaters:
                    !state.dataFilters.showOnlyAvailableSkaters,
                })
              )
            }
            className='form-check-input fs-5 '
            type='checkbox'
            value=''
            disabled={false}
            checked={state.dataFilters.showOnlyAvailableSkaters}
            id='flexCheckDefault'
          />
          <label className='form-check-label fs-6' htmlFor='flexCheckDefault'>
            Available Skaters Only
          </label>
        </div>
      ) : null}
      <SortOrderDropdown></SortOrderDropdown>
      <NumbericFilterDropdown></NumbericFilterDropdown>
      <div>
        <button
          onClick={() => {
            dispatch(saveQueryAction({ ...state }, currDataFilters));
          }}
          className='btn btn-info mx-2'
          // disabled={state.sav edQueries.selectedIndex !== undefined}
        >
          Save
        </button>
        <div className='btn-group'>
          <a
            onClick={() => {
              dispatch(
                editFiltersAction({ ...state.dataFilters, isAverages: true })
              );
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
            }}
            className={`${
              state.dataFilters.isAverages ? '' : 'active'
            } btn btn-primary`}
          >
            Totals
          </a>
        </div>
      </div>
    </div>
  );
};
