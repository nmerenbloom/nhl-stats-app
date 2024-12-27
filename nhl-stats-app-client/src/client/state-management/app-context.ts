import React, { Dispatch } from 'react';
import { AppState } from '../../types/state';

interface ContextObject {
  state: AppState;
  dispatch: Dispatch<any>;
}

const CustomContext = React.createContext({} as ContextObject);

export function useCustomContext() {
  return React.useContext(CustomContext);
}

export default CustomContext;
