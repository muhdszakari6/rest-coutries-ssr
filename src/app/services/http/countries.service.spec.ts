import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TESTING_CONSTANTS } from 'src/app/shared/constants/test-constants';

import { CountriesService } from './countries.service';

const {
  COUNTRIES,
  COUNTRY_NAME,
  BORDER_COUNTRIES_CODE,
  REGION
} = TESTING_CONSTANTS

describe('CountriesService', () => {
  let service: CountriesService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(CountriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get all countries', () => {
    it('should call getCountries with the correct URL and respond.', (done: DoneFn) => {

      service.getCountries().subscribe(
        (countries) => {
          expect(countries.length).toBe(COUNTRIES.length);
        }
      )

      const req = httpTestingController.expectOne(`/all`)

      expect(req.request.method).toBe('GET');

      req.flush(COUNTRIES);

      httpTestingController.verify()

      done()
    });
  });

  describe('search countries ', () => {
    it('should call searchCountries with the correct URL and respond', (done: DoneFn) => {

      service.searchCountries(COUNTRY_NAME).subscribe(
        (countries) => {
          expect(countries.length).toBe(COUNTRIES.length);
        }
      )

      const req = httpTestingController.expectOne(`/name/${COUNTRY_NAME}`)

      expect(req.request.method).toBe('GET');

      req.flush(COUNTRIES);

      httpTestingController.verify()

      done()
    });
  });

  describe('get country', () => {
    it('should call getCountryByFullText  with the correct URL and respond', (done: DoneFn) => {

      service.getCountryByFullText(COUNTRY_NAME).subscribe(
        (country) => {
          expect(country[0].name.common).toBe(COUNTRIES[0].name.common);
        }
      )

      const req = httpTestingController.expectOne(`/name/${COUNTRY_NAME}?fullText=true`)

      expect(req.request.method).toBe('GET');
      req.flush(COUNTRIES);


      httpTestingController.verify()

      done()
    });
  });


  describe('get border countries', () => {
    it('should call getBorderCountries  with the correct URL and respond', (done: DoneFn) => {

      service.getBorderCountries(BORDER_COUNTRIES_CODE).subscribe(
        (border_countries) => {
          expect(border_countries.length).toBe(COUNTRIES.length);

        }
      )

      const req = httpTestingController.expectOne(`/alpha?codes=${BORDER_COUNTRIES_CODE?.join(",")}`)

      expect(req.request.method).toBe('GET');

      req.flush(COUNTRIES);

      httpTestingController.verify()

      done()
    });
  });


  describe('filter by region', () => {
    it('should call filterByRegion with the correct URL and respond', (done: DoneFn) => {

      service.filterByRegion(REGION).subscribe(
        (countries) => {
          expect(countries.length).toBe(COUNTRIES.length);
        }
      )

      const req = httpTestingController.expectOne(`/region/${REGION}`)

      expect(req.request.method).toBe('GET');

      req.flush(COUNTRIES);

      httpTestingController.verify()

      done()
    });
  });

});
