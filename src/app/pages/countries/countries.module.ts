import { NgModule } from '@angular/core';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { countriesReducer } from './state/reducers/countries.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CountriesEffects } from './state/effects/countries.effects';


@NgModule({
  declarations: [
    CountriesComponent,
  ],
  imports: [
    CountriesRoutingModule,
    SharedModule,
    StoreModule.forFeature('countries', countriesReducer),
    EffectsModule.forFeature([CountriesEffects])
  ],
})
export class CountriesModule { }
