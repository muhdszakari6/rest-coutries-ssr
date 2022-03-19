import { State } from './../../state/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCountries, getError, getLoading } from './state/reducers/countries.reducers';
import { Observable, } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { getCountriesAction } from './state/actions/countries.actions';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent {

  countries$: Observable<Country[]> = this.store.select(getCountries);
  loading$: Observable<boolean> = this.store.select(getLoading)
  error$: Observable<any> = this.store.select(getError)

  regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  constructor(
    private store: Store<State>
  ) {
    this.store.dispatch(getCountriesAction({ payload: { type: '', query: '' } }));
  }

  applyFilter(filterValue: string) {
    if (filterValue === '') {
      this.store.dispatch(getCountriesAction({ payload: { type: '', query: '' } }));
    } else {
      this.store.dispatch(getCountriesAction({ payload: { type: 'search', query: filterValue.toLowerCase() } }));
    }

  }

  regionChanged(region: string) {
    if (region == '') {
      this.store.dispatch(getCountriesAction({ payload: { type: '', query: '' } }));
    } else {
      this.store.dispatch(getCountriesAction({ payload: { type: 'filter', query: region } }));
    }
  }

  trackCountry(index: number, country: Country) {
    return country.name.common;
  }

}
