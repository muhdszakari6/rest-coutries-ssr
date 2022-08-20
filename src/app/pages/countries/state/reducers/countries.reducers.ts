import { getCountriesAction, getCountriesFailure, getCountriesSuccess } from './../actions/countries.actions';
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Country } from 'src/app/models/country.model';
import * as AppState from '../../../../state/app.state';

export interface State extends AppState.State {
  countries: CountriesState;
}

export interface CountriesState {
  countries: Country[],
  error: string,
  loading: boolean
}

export const initialState: CountriesState = {
  countries: [],
  error: "",
  loading: false
};


export const countriesReducer = createReducer<CountriesState>(
  initialState,
  on(getCountriesAction, (state): CountriesState => {
    return {
      ...state,
      loading: true,

    };
  }),
  on(getCountriesSuccess, (state, action): CountriesState => {
    return {
      ...state,
      loading: false,
      countries: action.countries,
      error: ""

    };
  }),
  on(getCountriesFailure, (state, action): CountriesState => {
    return {
      ...state,
      loading: false,
      error: action.error,
      countries: [],

    };
  }),


);

///SELECTORS

const getCountriesFeatureState = createFeatureSelector<CountriesState>('countries');

export const getCountries = createSelector(
  getCountriesFeatureState,
  state => state.countries
);

export const getLoading = createSelector(
  getCountriesFeatureState,
  state => state.loading
);

export const getError = createSelector(
  getCountriesFeatureState,
  state => state.error
);
