import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { getCountryAction } from './state/actions/country.actions';
import {
  getBorderCountriesSelector,
  getBorderCountriesLoading,
  getCountry,
  State,
  getLoading,
  getError,
} from './state/reducers/country.reducers';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent {
  country$: Observable<Country | undefined> = this.store.select(getCountry);
  borderCountries$: Observable<Country[]> = this.store.select(getBorderCountriesSelector);
  loading$: Observable<boolean> = this.store.select(getLoading);
  borderCountriesLoading$: Observable<boolean> = this.store.select(getBorderCountriesLoading);
  error$: Observable<any> = this.store.select(getError);
  routeParamsSub: Subscription
  constructor(
    private location: Location,
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeParamsSub = this.route.params.subscribe((res) => {
      this.store.dispatch(getCountryAction({ countryName: res['name'] }));
    });
  }


  back() {
    this.location.back();
  }

  goToCountry(country: string) {
    this.router.navigate([country]);
  }
}
