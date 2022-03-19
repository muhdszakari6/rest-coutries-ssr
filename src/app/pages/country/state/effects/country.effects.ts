import { State } from './../reducers/country.reducers';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { CountriesService } from 'src/app/services/http/countries.service';
import { getBorderCountriesAction, getBorderCountriesFailure, getBorderCountriesRefresh, getBorderCountriesSuccess, getCountryAction, getCountryFailure, getCountrySuccess } from '../actions/country.actions';

@Injectable()
export class CountryEffects {

  cache = new Map();


  constructor(private actions$: Actions,
    private store: Store<State>,
    private countriesService: CountriesService) { }


  country$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCountryAction),
      switchMap(action => {
        const serializedAction = JSON.stringify(action);
        if (this.cache.has(serializedAction)) {
          this.cache.get(serializedAction).borders ? this.store.dispatch(getBorderCountriesAction({ codes: this.cache.get(serializedAction).borders })) : this.store.dispatch(getBorderCountriesRefresh());
          return of(getCountrySuccess({ country: this.cache.get(serializedAction) }))
        }
        else {
          return this.countriesService.getCountryByFullText(action.countryName).pipe(
            map(res => {
              this.cache.set(serializedAction, res[0]);
              res[0].borders ? this.store.dispatch(getBorderCountriesAction({ codes: res[0].borders })) : null;
              return getCountrySuccess({ country: res[0] })
            }),
            catchError(error => of(getCountryFailure({ error })))
          )
        }

      })
    )
  })

  border_countries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBorderCountriesAction),
      switchMap(action => {
        const serializedAction = JSON.stringify(action);
        if (this.cache.has(serializedAction)) {
          return of(getBorderCountriesSuccess({ countries: this.cache.get(serializedAction) }))
        }
        else {
          return this.countriesService.getBorderCountries(action.codes).pipe(
            map(res => {
              this.cache.set(serializedAction, res);
              return getBorderCountriesSuccess({ countries: res })
            }),
            catchError(error => of(getBorderCountriesFailure({ error })))
          )
        }

      })
    )
  })
}

