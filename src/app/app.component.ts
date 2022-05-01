import { getCurrentTheme } from './state/reducers/theme.reducer';
import { Component, Renderer2 } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { State } from './state/app.state';
import { Store } from '@ngrx/store';
import { toggleTheme } from './state/actions/theme.actions';
import { saveRoute } from './state/actions/route.action';
import { getRoutes } from './state/reducers/route.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean;
  loaderSubscription: Subscription;
  themeSubscription: Subscription;
  darkTheme: boolean = false;
  routes$: Observable<string[]> = this.store.select(getRoutes)


  constructor(
    private router: Router,
    private _renderer: Renderer2,
    private store: Store<State>,
  ) {
    this.disableAutoZoomIos()

    this.loading = false

    this.loaderSubscription = this.router.events.subscribe(
      (event: any) => {
        if (event instanceof RouteConfigLoadStart) {
          this.loading = true
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loading = false
        }
        else if (event instanceof NavigationEnd) {
          if (event.url !== "/")
            this.store.dispatch(saveRoute({ route: this.transformRouteString(event.url) }));
        }
      }
    )

    this.themeSubscription = this.store.select(getCurrentTheme).subscribe(
      (isDarkTheme: boolean) => {
        isDarkTheme ? this.setDarkTheme() : this.setLightTheme()
        this.darkTheme = isDarkTheme
      }
    )

  }

  changeTheme() {
    if (!this.darkTheme) {
      this.setDarkTheme()
      this.store.dispatch(toggleTheme());

    } else {
      this.setLightTheme()
      this.store.dispatch(toggleTheme());
    }
  }

  setDarkTheme() {
    this._renderer.addClass(document.body, 'dark-theme');
    this._renderer.removeClass(document.body, 'light-theme');
  }
  setLightTheme() {
    this._renderer.addClass(document.body, 'light-theme');
    this._renderer.removeClass(document.body, 'dark-theme');
  }

  transformRouteString(route: string) {
    return decodeURI(route.slice(1))
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  disableAutoZoomIos() {
    let iOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS && document?.head?.querySelector('meta[name="viewport"]')?.getAttribute('content'))
      document?.head?.querySelector('meta[name="viewport"]')?.setAttribute('content', "width=device-width, initial-scale=1, maximum-scale=1");
    else
      document?.head?.querySelector('meta[name="viewport"]')?.setAttribute('content', "width=device-width, initial-scale=1");
  }


}
