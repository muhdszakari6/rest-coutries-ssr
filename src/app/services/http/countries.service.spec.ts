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

const wrapResponse = (objects: any[]) => ({ data: { objects, meta: { total: objects.length, count: objects.length, limit: 250, offset: 0, more: false } } });

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
      service.getCountries().subscribe(countries => {
        expect(countries.length).toBe(COUNTRIES.length);
        done();
      });

      const req = httpTestingController.expectOne(`?limit=250`);
      expect(req.request.method).toBe('GET');
      req.flush(wrapResponse(COUNTRIES));
      httpTestingController.verify();
    });
  });

  describe('search countries', () => {
    it('should call searchCountries with the correct URL and respond', (done: DoneFn) => {
      service.searchCountries(COUNTRY_NAME).subscribe(countries => {
        expect(countries.length).toBe(COUNTRIES.length);
        done();
      });

      const req = httpTestingController.expectOne(`?q=${COUNTRY_NAME}`);
      expect(req.request.method).toBe('GET');
      req.flush(wrapResponse(COUNTRIES));
      httpTestingController.verify();
    });
  });

  describe('get country', () => {
    it('should call getCountryByFullText with the correct URL and respond', (done: DoneFn) => {
      service.getCountryByFullText(COUNTRY_NAME).subscribe(country => {
        expect(country[0].names.common).toBe(COUNTRIES[0].names.common);
        done();
      });

      const req = httpTestingController.expectOne(`names.common/${COUNTRY_NAME}`);
      expect(req.request.method).toBe('GET');
      req.flush(wrapResponse(COUNTRIES));
      httpTestingController.verify();
    });
  });

  describe('get border countries', () => {
    it('should call getBorderCountries with the correct URLs and respond', (done: DoneFn) => {
      service.getBorderCountries(BORDER_COUNTRIES_CODE).subscribe(border_countries => {
        expect(border_countries.length).toBe(BORDER_COUNTRIES_CODE.length);
        done();
      });

      BORDER_COUNTRIES_CODE.forEach((code, i) => {
        const req = httpTestingController.expectOne(`codes.alpha_3/${code}`);
        expect(req.request.method).toBe('GET');
        req.flush(wrapResponse([COUNTRIES[i]]));
      });

      httpTestingController.verify();
    });
  });

  describe('filter by region', () => {
    it('should call filterByRegion with the correct URL and respond', (done: DoneFn) => {
      service.filterByRegion(REGION).subscribe(countries => {
        expect(countries.length).toBe(COUNTRIES.length);
        done();
      });

      const req = httpTestingController.expectOne(`region/${REGION}`);
      expect(req.request.method).toBe('GET');
      req.flush(wrapResponse(COUNTRIES));
      httpTestingController.verify();
    });
  });

});
