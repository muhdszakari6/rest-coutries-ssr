import { Country } from 'src/app/models/country.model';
import {
  countryRootInitalState,
  TESTING_CONSTANTS,
} from 'src/app/shared/constants/test-constants';
import {
  getBorderCountriesAction,
  getBorderCountriesFailure,
  getBorderCountriesRefresh,
  getBorderCountriesSuccess,
  getCountryAction,
  getCountryFailure,
  getCountryRefresh,
  getCountrySuccess,
} from '../actions/country.actions';
import * as fromReducer from './country.reducers';

const { COUNTRIES } = TESTING_CONSTANTS;

describe('countryReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.countryReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('Known actions', () => {
    it('should change loading state when getCountryAction is dispatched', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountryState = {
        ...initialState,
        loading: true,
      };
      const action = getCountryAction({ countryName: 'Moldova' });
      const state = fromReducer.countryReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change country state when getCountrySuccess is dispatched', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountryState = {
        ...initialState,
        loading: false,
        error: '',
        country: COUNTRIES[1] as unknown as Country,
      };
      const action = getCountrySuccess({
        country: COUNTRIES[1] as unknown as Country,
      });
      const state = fromReducer.countryReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change error state when getCountryFailed is dispatched', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountryState = {
        ...initialState,
        loading: false,
        error: 'Error',
        country: undefined,
      };
      const action = getCountryFailure({ error: 'Error' });
      const state = fromReducer.countryReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should revert to initialState getCountryRefresh is dispatched', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountryState = {
        ...initialState,
      };
      const action = getCountryRefresh();
      const state = fromReducer.countryReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change borderCountries loading state when getBorderCountriesAction is dispatched', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountryState = {
        ...initialState,
        borderCountriesLoading: true,
        borderCountriesError: '',
        borderCountries: [],
      };
      const action = getBorderCountriesAction({ codes: ['Moldova'] });
      const state = fromReducer.countryReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change borderCountries state when getBorderCountriesSuccess is dispatched', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountryState = {
        ...initialState,
        borderCountries: COUNTRIES as unknown as Country[],
        borderCountriesError: '',
        borderCountriesLoading: false,
      };
      const action = getBorderCountriesSuccess({
        countries: COUNTRIES as unknown as Country[],
      });
      const state = fromReducer.countryReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change borderCountriesError state when getBorderCountriesFailure is dispatched', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountryState = {
        ...initialState,
        borderCountries: [],
        borderCountriesError: 'Error',
        borderCountriesLoading: false,
      };
      const action = getBorderCountriesFailure({ error: 'Error' });
      const state = fromReducer.countryReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should change borderCountries to initialState getBorderCountriesRefresh is dispatched', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountryState = {
        ...initialState,
        borderCountries: [],
        borderCountriesError: '',
        borderCountriesLoading: false,
      };
      const action = getBorderCountriesRefresh();
      const state = fromReducer.countryReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('Selectors', () => {
    it('should select the country', () => {
      const result = fromReducer.getCountry.projector(
        countryRootInitalState.country
      );
      expect(result).toBe(countryRootInitalState.country.country);
    });
    it('should select loading', () => {
      const result = fromReducer.getLoading.projector(
        countryRootInitalState.country
      );
      expect(result).toBe(countryRootInitalState.country.loading);
    });
    it('should select error', () => {
      const result = fromReducer.getError.projector(
        countryRootInitalState.country
      );
      expect(result).toBe(countryRootInitalState.country.error);
    });

    it('should select the border countries', () => {
      const result = fromReducer.getBorderCountriesSelector.projector(
        countryRootInitalState.country
      );
      expect(result).toBe(countryRootInitalState.country.borderCountries);
    });
    it('should select  border countries loading', () => {
      const result = fromReducer.getLoading.projector(
        countryRootInitalState.country
      );
      expect(result).toBe(
        countryRootInitalState.country.borderCountriesLoading
      );
    });
  });
});
