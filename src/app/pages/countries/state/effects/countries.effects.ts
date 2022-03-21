import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { CountriesService } from 'src/app/services/http/countries.service';
import { getCountriesAction, getCountriesFailure, getCountriesSuccess } from '../actions/countries.actions';

@Injectable()
export class CountriesEffects {
  cache = new Map<string, Country[]>();

  constructor(private actions$: Actions, private countriesService: CountriesService) { }

  countries$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(getCountriesAction),
        switchMap(action => {
          const serializedAction = JSON.stringify(action);
          if (action.payload.type === "search") {
            if (this.cache.has(serializedAction)) {
              return of(getCountriesSuccess({ countries: this.cache.get(serializedAction) ?? [] }))
            } else {
              return this.countriesService.searchCountries(action.payload.query)
                .pipe(
                  map(res => {
                    return this.mapResponse(res, serializedAction)
                  }),
                  catchError(error => of(getCountriesFailure({ error })))
                )
            }

          }
          else if (action.payload.type === "filter") {
            if (this.cache.has(serializedAction)) {
              return of(getCountriesSuccess({ countries: this.cache.get(serializedAction) ?? [] }))
            } else {
              return this.countriesService.filterByRegion(action.payload.query)
                .pipe(
                  map(res => {
                    return this.mapResponse(res, serializedAction)
                  }),
                  catchError(error => of(getCountriesFailure({ error })))
                )
            }

          }
          else {
            if (this.cache.has(serializedAction)) {
              return of(getCountriesSuccess({ countries: this.cache.get(serializedAction) ?? [] }))
            } else {
              return this.countriesService.getCountries()
                .pipe(
                  map(res => {
                    return this.mapResponse(res, serializedAction)
                  }),
                  catchError(error => of(getCountriesFailure({ error })))
                )
            }
          }
        })
      );
  });

  mapResponse = (response: Country[], serializedAction: string) => {
    let sortedResponse = sortCountries(response)
    this.cache.set(serializedAction, sortedResponse);
    return getCountriesSuccess({ countries: sortedResponse })
  }

}


const sortCountries = (countries: Country[]) => {
  return countries.sort((a: Country, b: Country) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0))
}
