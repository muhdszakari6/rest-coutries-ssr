import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Country } from 'src/app/models/country.model';
import { TESTING_CONSTANTS } from '../constants/test-constants';
import { SharedModule } from '../shared.module';

import { CountryCardComponent } from './country-card.component';


const {
  COUNTRIES

} = TESTING_CONSTANTS


describe('CountryCardComponent', () => {
  let component: CountryCardComponent;
  let fixture: ComponentFixture<CountryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [CountryCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCardComponent);
    component = fixture.componentInstance;
    component.country = COUNTRIES[1] as unknown as Country
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display country name', () => {
    const countryName = fixture.debugElement.query(By.css('h2[data-test="country-name"]')).nativeElement
    expect(countryName.innerText).toBe(COUNTRIES[1].name.common)
  });

  it('should display country population', () => {
    const countryPopulation = fixture.debugElement.query(By.css('span[data-test="country-population"]')).nativeElement
    expect(countryPopulation.innerText).toBe(COUNTRIES[1].population.toLocaleString())
  });


  it('should display country region', () => {
    const region = fixture.debugElement.query(By.css('span[data-test="country-region"]')).nativeElement
    expect(region.innerText).toBe(COUNTRIES[1].region)
  });

  it('should display country capital', () => {
    const capital = fixture.debugElement.query(By.css('span[data-test="country-capital"]')).nativeElement
    expect(capital.innerText).toBe(COUNTRIES[1].capital[0])
  });

});
