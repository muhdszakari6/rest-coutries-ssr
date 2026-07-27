import { getCurrentTheme } from './state/reducers/theme.reducer';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { State } from './state/app.state';
import { Store } from '@ngrx/store';
import { toggleTheme } from './state/actions/theme.actions';
import { saveRoute } from './state/actions/route.action';
import { getRoutes } from './state/reducers/route.reducer';
import { PromptUpdateService } from './services/prompt-update.service';


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
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private _renderer: Renderer2,
    private store: Store<State>,
    private promptUpdate: PromptUpdateService,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.disableAutoZoomIos()
      this.promptUpdate.promptServiceWorkerUpdate()
    }

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
    this._renderer.addClass(this.doc.body, 'dark-theme');
    this._renderer.removeClass(this.doc.body, 'light-theme');
  }
  setLightTheme() {
    this._renderer.addClass(this.doc.body, 'light-theme');
    this._renderer.removeClass(this.doc.body, 'dark-theme');
  }

  transformRouteString(route: string) {
    return decodeURI(route.slice(1))
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  disableAutoZoomIos() {
    const platform = (navigator as any).platform || '';
    const iOS = /iPad|iPhone|iPod/.test(platform);
    const viewport = this.doc.head?.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', iOS
        ? 'width=device-width, initial-scale=1, maximum-scale=1'
        : 'width=device-width, initial-scale=1'
      );
    }
  }

}
