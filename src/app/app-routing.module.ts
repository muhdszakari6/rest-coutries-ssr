import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/countries/countries.module').then(m => m.CountriesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    enableTracing: false,
    scrollPositionRestoration: 'enabled',

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
