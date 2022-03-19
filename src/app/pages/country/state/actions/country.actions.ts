import { createAction, props } from "@ngrx/store";
import { Country } from "src/app/models/country.model";

export const getBorderCountriesAction = createAction(
  'Get Border Countries',
  props<{ codes: string[] }>()

);

export const getBorderCountriesSuccess = createAction(
  'Get Border Countries Success',
  props<{ countries: Country[] }>()
);

export const getBorderCountriesFailure = createAction(
  'Get Border Countries Failure',
  props<{ error: any }>()
);

export const getBorderCountriesRefresh = createAction(
  'Get Border Country Refresh',
);


export const getCountryAction = createAction(
  'Get Country',
  props<{ countryName: string }>()

);

export const getCountrySuccess = createAction(
  'Get Country Success',
  props<{ country: Country }>()
);

export const getCountryFailure = createAction(
  'Get Country Failure',
  props<{ error: any }>()
);

export const getCountryRefresh = createAction(
  'Get Country Refresh',
);
