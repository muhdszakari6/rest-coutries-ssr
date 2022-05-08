/* NgRx */
import {
  createReducer, on, createFeatureSelector, createSelector, Action,
  ActionReducer,
  ReducerTypes,
  ActionCreator,
  ActionType,
} from '@ngrx/store';
import { toggleTheme } from '../actions/theme.actions';

export interface ThemeState {
  isDarkTheme: boolean;
}

export const initialState: ThemeState = {
  isDarkTheme: false,
};

// Selector functions
const getThemeFeatureState = createFeatureSelector<ThemeState>('theme');

export const getCurrentTheme = createSelector(
  getThemeFeatureState,
  state => state.isDarkTheme
);


export const themeReducer = createRehydrateReducer<ThemeState>(
  'theme',
  initialState,
  on(toggleTheme, (state): ThemeState => {
    return {
      ...state,
      isDarkTheme: !state.isDarkTheme
    };
  })
);


/**
* Creates reducer using stored state in localStorage or passed in initialState
*  @param {string} key Key value of state stored or to be stored in localStorage
*  @param {S} initialState Initial state of the reducer to be used when state is not in localStorage.
*  @param { ReducerTypes<S, ActionCreator[]>[]} ons Associations between actions and state changes.
* @return A reducer function
  @usageNotes
  New ons gets created to save any state/store change to localStorage
**/
export function createRehydrateReducer<S, A extends Action = Action>(
  key: string,
  initialState: S,
  ...ons: ReducerTypes<S, ActionCreator[]>[]
): ActionReducer<S, A> {
  const item = localStorage.getItem(key);
  const newInitialState =
    (item && JSON.parse(item)) ?? initialState;

  const newOns: ReducerTypes<S, ActionCreator[]>[] = [];
  ons.forEach((oldOn: ReducerTypes<S, ActionCreator[]>) => {
    const newReducer = (
      state: S,
      action: ActionType<ActionCreator[][number]>
    ) => {
      const newState = oldOn.reducer(state, action);
      localStorage.setItem(key, JSON.stringify(newState));
      return newState;
    };
    newOns.push({ ...oldOn, reducer: newReducer });
  });
  return createReducer(newInitialState, ...newOns);
}
