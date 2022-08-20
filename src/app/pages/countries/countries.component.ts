import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCountries, getError, getLoading, State } from './state/reducers/countries.reducers';
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
  selectedRegion: string | undefined
  searchValue: string = ''


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

    if (window) {
      console.log(window)
      return
    }
    this.store.dispatch(getCountriesAction({ payload: { type: '', query: '' } }));
  }

  applyFilter(filterValue: string) {
    if (filterValue === '') {
      this.store.dispatch(getCountriesAction({ payload: { type: '', query: '' } }));
    } else {
      this.store.dispatch(getCountriesAction({ payload: { type: 'search', query: filterValue.toLowerCase() } }));
    }
    this.selectedRegion = ''
  }

  regionChanged(region: string) {
    if (region == '') {
      this.store.dispatch(getCountriesAction({ payload: { type: '', query: '' } }));
    } else {
      this.store.dispatch(getCountriesAction({ payload: { type: 'filter', query: region } }));
    }
    this.searchValue = ''
  }

  trackCountry(index: number, country: Country) {
    return country.name.common;
  }
  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
