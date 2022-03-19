import { Country } from 'src/app/models/country.model';
import { countriesRootInitalState, TESTING_CONSTANTS } from 'src/app/shared/constants/test-constants';
import { getCountriesAction, getCountriesFailure, getCountriesSuccess } from '../actions/countries.actions';
import * as fromReducer from './countries.reducers';

const {
  COUNTRIES,
} = TESTING_CONSTANTS


describe('countriesReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.countriesReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('Known actions', () => {
    it('should change loading state when getCountriesAction is dispatched', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountriesState = {
        ...initialState,
        "loading": true
      }
      const action = getCountriesAction({ payload: { type: '', query: '' } });
      const state = fromReducer.countriesReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
    it('should change countries state on getCountriesSuccess', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountriesState = {
        ...initialState,
        loading: false,
        countries: COUNTRIES as unknown as Country[],
        error: ""
      }
      const action = getCountriesSuccess({ countries: COUNTRIES as unknown as Country[] });
      const state = fromReducer.countriesReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
    it('should change error state on getCountriesFailure', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.CountriesState = {
        ...initialState,
        loading: false,
        error: "Error",
        countries: [],

      }
      const action = getCountriesFailure({ error: "Error" });
      const state = fromReducer.countriesReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('Selectors', () => {
    it("should select countries", () => {
      const result = fromReducer.getCountries.projector(countriesRootInitalState.countries);
      expect(result).toBe(countriesRootInitalState.countries.countries);
    });
    it("should select loading", () => {
      const result = fromReducer.getLoading.projector(countriesRootInitalState.countries);
      expect(result).toBe(countriesRootInitalState.countries.loading);
    });
    it("should select error", () => {
      const result = fromReducer.getError.projector(countriesRootInitalState.countries);
      expect(result).toBe(countriesRootInitalState.countries.error);
    });
  })


});
