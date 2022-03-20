import { NgModule } from '@angular/core';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from './state/effects/country.effects';
import { countryReducer } from './state/reducers/country.reducers';
import { FirstObjValuePipe } from 'src/app/pipes/first-obj-value.pipe';
import { CountriesModule } from '../countries/countries.module';


@NgModule({
  declarations: [
    CountryComponent,
    FirstObjValuePipe,
  ],
  imports: [
    CountryRoutingModule,
    CountriesModule,
    SharedModule,
    StoreModule.forFeature('country', countryReducer),
    EffectsModule.forFeature([CountryEffects])
  ]
})
export class CountryModule { }
