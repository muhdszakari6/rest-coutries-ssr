import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Country } from 'src/app/models/country.model';
import { TESTING_CONSTANTS } from 'src/app/shared/constants/test-constants';
import { CountryCardComponent } from 'src/app/shared/country-card/country-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountriesComponent } from './countries.component';
import { getCountriesAction } from './state/actions/countries.actions';
import { getCountries } from './state/reducers/countries.reducers';

const {
  COUNTRIES,
} = TESTING_CONSTANTS



describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let store: MockStore;
  let spyDispatch: any

  const initialState = {
    countries: [],
    error: "",
    loading: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [CountriesComponent, CountryCardComponent],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
    store.overrideSelector(
      getCountries,
      COUNTRIES as unknown as Country[]
    );

    store.dispatch = () => { }
    spyDispatch = spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display countries', () => {
    const countries = fixture.debugElement.queryAll(By.css('h2[data-test="country-name"]'))
    expect(countries.length).toBe(COUNTRIES.length);
  });

  it('should call dispatch with getCountriesAction', () => {
    expect(spyDispatch).toHaveBeenCalledWith(getCountriesAction({ payload: { type: '', query: '' } }))
  });

  it('should dispatch proper action when search gets done', () => {
    const searchInput = fixture.debugElement.query(By.css('input[data-test="country-search"]')).nativeElement

    searchInput.value = "moldova"

    searchInput.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(spyDispatch).toHaveBeenCalledWith(getCountriesAction({ payload: { type: 'search', query: "moldova" } }))
  });


  it('should dispatch proper action when filter by region gets done', () => {

    component.regionChanged("Africa")

    fixture.detectChanges();

    expect(spyDispatch).toHaveBeenCalledWith(getCountriesAction({ payload: { type: 'filter', query: "Africa" } }))
  });


});
