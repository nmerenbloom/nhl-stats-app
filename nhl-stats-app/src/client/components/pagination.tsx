import { paginateAction } from '../state-management/actions';
import { useCustomContext } from '../state-management/app-context';

export const Pagination = () => {
  const { state, dispatch } = useCustomContext();

  let pagesArr = [];
  for (let i = 0; i < state?.pagination?.totalPages; i++) {
    pagesArr[i] = i + 1;
  }
  return (
    <div className='d-flex justify-content-center overflow-hidden'>
      {pagesArr.map((n, i) => {
        return (
          <p
            key={i}
            onClick={() => dispatch(paginateAction(n))}
            className={`${
              state?.pagination?.currPage === n ? 'selected-page' : ''
            } mx-2 text-primary text-underline-hover p-2`}
          >
            {n}
          </p>
        );
      })}
    </div>
  );
};
