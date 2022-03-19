import { getBorderCountriesAction, getBorderCountriesFailure, getBorderCountriesRefresh, getBorderCountriesSuccess, getCountryAction, getCountryFailure, getCountryRefresh, getCountrySuccess } from '../actions/country.actions';
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Country } from 'src/app/models/country.model';
import * as AppState from '../../../../state/app.state';

export interface State extends AppState.State {
  country: CountryState;
}

export interface CountryState {
  country: Country | undefined,
  error: string,
  loading: boolean,
  borderCountries: Country[],
  borderCountriesLoading: boolean,
  borderCountriesError: string
}

export const initialState: CountryState = {
  country: undefined,
  error: "",
  loading: false,
  borderCountries: [],
  borderCountriesLoading: false,
  borderCountriesError: ""
};


export const countryReducer = createReducer<CountryState>(
  initialState,
  on(getCountryAction, (state, action): CountryState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(getCountrySuccess, (state, action): CountryState => {
    return {
      ...state,
      loading: false,
      error: "",
      country: action.country
    };
  }),
  on(getCountryFailure, (state, action): CountryState => {
    return {
      ...state,
      loading: false,
      error: action.error,
      country: undefined

    };
  }),
  on(getCountryRefresh, (state, action): CountryState => {
    return {
      ...state,
      ...initialState,
    };
  }),

  on(getBorderCountriesAction, (state, action): CountryState => {
    return {
      ...state,
      borderCountriesLoading: true,
      borderCountriesError: "",
      borderCountries: [],

    };
  }),

  on(getBorderCountriesSuccess, (state, action): CountryState => {
    return {
      ...state,
      borderCountries: action.countries,
      borderCountriesError: "",
      borderCountriesLoading: false

    };
  }),
  on(getBorderCountriesFailure, (state, action): CountryState => {
    return {
      ...state,
      borderCountries: [],
      borderCountriesError: action.error,
      borderCountriesLoading: false

    };
  }),
  on(getBorderCountriesRefresh, (state, action): CountryState => {
    return {
      ...state,
      borderCountries: [],
      borderCountriesError: "",
      borderCountriesLoading: false

    };
  }),


);

///SELECTORS

const getCountriesFeatureState = createFeatureSelector<CountryState>('country');

export const getCountry = createSelector(
  getCountriesFeatureState,
  state => state.country
);

export const getBorderCountriesSelector = createSelector(
  getCountriesFeatureState,
  state => state.borderCountries
);
export const getBorderCountriesLoading = createSelector(
  getCountriesFeatureState,
  state => state.borderCountriesLoading
);

export const getLoading = createSelector(
  getCountriesFeatureState,
  state => state.loading
);

export const getError = createSelector(
  getCountriesFeatureState,
  state => state.error
);
