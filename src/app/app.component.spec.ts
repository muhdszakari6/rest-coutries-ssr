import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { getRoutes } from './state/reducers/route.reducer';
import { getCurrentTheme } from './state/reducers/theme.reducer';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let spyDispatch: any

  const mockRoutes = ["moldova", "spain", "gambia"]
  const mockTheme = true
  const initialState = {
    isDarkTheme: false,
    routes: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(
      getRoutes,
      mockRoutes
    );
    store.overrideSelector(
      getCurrentTheme,
      mockTheme
    );
    store.dispatch = () => { }
    spyDispatch = spyOn(store, 'dispatch');

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Note for self: Below is needed in other testing scenarios, check, https://ngrx.io/guide/store/testing
    // store.refreshState();

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call store dispatch when change theme is called', () => {
    component.changeTheme()
    fixture.detectChanges();
    expect(spyDispatch).toHaveBeenCalledTimes(1)
  });

  it('should have routes$ emit routes in store ', () => {
    component.routes$.subscribe(routes => {
      expect(routes.length).toBe(mockRoutes.length);
    })
  });

  it('should select current theme from store', () => {
    store.select(getCurrentTheme).subscribe(isDarkTheme => {
      expect(isDarkTheme).toBe(mockTheme);
    })
  });

});
