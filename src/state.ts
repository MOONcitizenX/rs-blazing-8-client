import { createContext } from 'react';
import { State } from './stateTypes';
import { getLS } from './utils/localStorageHelpers';

export interface Context {
  state: State;
}

const savedState = getLS('state');

export const initialState: State = {
  host: false,
  background: savedState?.background ?? '../../assets/images/western-bg.jpg',
  cardback: savedState?.cardback ?? '../../assets/images/cardback1.png',
};

export const StateContext = createContext<Context>({} as Context);
