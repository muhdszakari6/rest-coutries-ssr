import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries.component';

const routes: Routes = [
  { path: '', component: CountriesComponent },
  {
    path: ':name',
    loadChildren: () => import('../country/country.module').then(m => m.CountryModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
