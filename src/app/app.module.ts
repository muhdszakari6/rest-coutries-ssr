import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { themeReducer } from './state/reducers/theme.reducer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './interceptors/url.interceptor';
import { EnvironmentService } from './services/environment.service';
import { routeReducer } from './state/reducers/route.reducer';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    // StoreModule.forRoot({},),
    StoreModule.forRoot({ 'theme': themeReducer, 'routes': routeReducer }, {}),
    StoreDevtoolsModule.instrument({
      name: 'Reloadly Challenge Redux DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: EnvironmentService, useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true, },

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
