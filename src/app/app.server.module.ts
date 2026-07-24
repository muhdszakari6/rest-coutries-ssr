import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { EnvironmentService } from './services/environment.service';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    {
      provide: EnvironmentService,
      useValue: { ...environment, api_key: process.env['API_KEY'] || '' }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
