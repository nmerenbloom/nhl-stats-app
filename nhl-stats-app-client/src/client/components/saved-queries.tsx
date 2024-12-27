import { useState } from 'react';
import {
  deleteSavedQueryAction,
  editSavedQueryAction,
  selectSavedQueryAction,
} from '../state-management/actions';
import { useCustomContext } from '../state-management/app-context';

export const SavedQueries = () => {
  const { dispatch, state } = useCustomContext();
  // const [inEditMode, setInEditMode] = useState();

  return (
    <div className='d-flex flex-column'>
      {state?.savedQueries.savedQueries.map((savedQuery, index) => {
        const isSelected = state.savedQueries.selectedIndex === index;
        return (
          <div
            onClick={() => {
              dispatch(selectSavedQueryAction(index));
            }}
            key={index}
            className={`${
              isSelected ? 'border-success ' : 'savedQueryBox'
            } border border-3 rounded my-1 p-1 `}
          >
            {savedQuery.isEdit ? (
              <div className='input-group input-group-sm '>
                <input
                  type='text'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className='form-control'
                  value={savedQuery.name}
                  onChange={(e) => {
                    dispatch(
                      editSavedQueryAction({
                        query: { ...savedQuery, name: e.target.value },
                        index: index,
                      })
                    );
                  }}
                />
                <button
                  className='btn btn-outline-secondary btn-sm'
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      editSavedQueryAction({
                        query: {
                          ...savedQuery,
                          isEdit: false,
                        },
                        index: index,
                      })
                    );
                  }}
                >
                  Save
                </button>
                {/* <button
                  className='btn btn-outline-secondary btn-sm'
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteSavedQueryAction(index));
                  }}
                >
                  Del
                </button> */}
              </div>
            ) : (
              <div className='d-flex justify-content-between align-items-center'>
                <b>{savedQuery.name}</b>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        editSavedQueryAction({
                          query: {
                            ...savedQuery,
                            isEdit: true,
                          },
                          index: index,
                        })
                      );
                    }}
                    className='btn btn-outline-secondary btn-sm'
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-outline-secondary btn-sm'
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteSavedQueryAction(index));
                    }}
                  >
                    Del
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {/* <p className='lead'>
        Note: Sign in with Yahoo! to save search queries beyond this session
      </p> */}
    </div>
  );
};
