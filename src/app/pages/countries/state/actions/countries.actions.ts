import { createAction, props } from "@ngrx/store";
import { Country } from "src/app/models/country.model";

export interface QueryType {
  type: string;
  query: string
}

export const getCountriesAction = createAction(
  'Get Countries',
  props<{ payload: QueryType }>()

);

export const getCountriesSuccess = createAction(
  'Get Countries Success',
  props<{ countries: Country[] }>()
);

export const getCountriesFailure = createAction(
  'Get Countries Failure',
  props<{ error: any }>()
);

