import { State } from './../../state/app.state';
import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCountries, getError, getLoading } from './state/reducers/countries.reducers';
import { fromEvent, map, Observable, } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { getCountriesAction } from './state/actions/countries.actions';
import { DOCUMENT, ViewportScroller } from '@angular/common';


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

  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  constructor(
    private store: Store<State>,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly viewport: ViewportScroller
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
  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
