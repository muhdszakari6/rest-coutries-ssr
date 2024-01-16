import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries.component';

const routes: Routes = [
  {
    path: ':name',
    loadChildren: () => import('../country/country.module').then(m => m.CountryModule),
  },
  { path: '', component: CountriesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
