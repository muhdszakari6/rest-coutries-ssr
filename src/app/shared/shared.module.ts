import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { materials } from './angular-material/material-module';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { ErrorStateComponent } from './error-state/error-state.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CountryCardComponent } from './country-card/country-card.component';

const components = [
  HeaderComponent,
  PageLoaderComponent,
  ErrorStateComponent,
  BreadcrumbComponent,
  CountryCardComponent

]
const sharedModules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ...materials

]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...sharedModules,
  ],

  entryComponents: [],
  exports: [
    ...sharedModules,
    ...components,
  ],
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule
    };
  }
}
