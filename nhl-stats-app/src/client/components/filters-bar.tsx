import { Tooltip } from 'bootstrap';
import { useEffect } from 'react';
import {
  editFiltersAction,
  fetchPlayersAction,
  toggleSpinnerAction,
} from '../state-management/actions';
import { useCustomContext } from '../state-management/app-context';
import { SortOrderDropdown } from './sort-order-dropdown';
import { NumbericFilterDropdown } from './numeric-filter-dropdown';

export const FiltersBar = () => {
  const { state, dispatch } = useCustomContext();

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
      <NumbericFilterDropdown></NumbericFilterDropdown>
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
  );
};
