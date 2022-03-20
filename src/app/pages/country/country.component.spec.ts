import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Country } from 'src/app/models/country.model';
import { FirstObjValuePipe } from 'src/app/pipes/first-obj-value.pipe';
import { TESTING_CONSTANTS } from 'src/app/shared/constants/test-constants';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountryComponent } from './country.component';
import { getBorderCountriesSelector, getCountry } from './state/reducers/country.reducers';

const {
  COUNTRIES,
} = TESTING_CONSTANTS


describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let store: MockStore;
  let spyDispatch: any

  const initialState = {
    country: undefined,
    error: "",
    loading: false,
    borderCountries: [],
    borderCountriesLoading: false,
    borderCountriesError: ""
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [CountryComponent, FirstObjValuePipe],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
    store.overrideSelector(
      getCountry,
      COUNTRIES[1] as unknown as Country
    );
    store.overrideSelector(
      getBorderCountriesSelector,
      COUNTRIES as unknown as Country[]
    );
    store.dispatch = () => { }
    spyDispatch = spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dispatch once', () => {
    expect(spyDispatch).toHaveBeenCalledTimes(1)
  });

  it('should  display correct country flag', () => {
    const countryFlag = fixture.debugElement.query(By.css('img[data-test="country-flag"]')).nativeElement
    expect(countryFlag.src.trim()).toBe(COUNTRIES[1].flags.svg)
  });

  it('should display correct country name', () => {
    const countryName = fixture.debugElement.query(By.css('h2[data-test="country-name"]')).nativeElement
    expect(countryName.innerText.trim()).toBe(COUNTRIES[1].name.common)
  });

  it('should display border countries', () => {
    const borderCountries = fixture.debugElement.queryAll(By.css('button[data-test="border-countries"]'))
    expect(borderCountries.length).toBe(COUNTRIES.length)
  });

});
