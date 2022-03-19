import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from '../services/environment.service';
import { CountriesService } from '../services/http/countries.service';
import { TESTING_CONSTANTS } from '../shared/constants/test-constants';
import { HttpRequest, HttpResponse, } from '@angular/common/http';
import { UrlInterceptor } from './url.interceptor';

const {
  BASE_URL,
} = TESTING_CONSTANTS


describe('UrlInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let service: CountriesService;
  let mockConfig: jasmine.SpyObj<EnvironmentService>
  let envService; EnvironmentService



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UrlInterceptor,
        CountriesService,
        { provide: EnvironmentService, useValue: mockConfig },

      ]
    });
    mockConfig = jasmine.createSpyObj('EnvironmentService', [],
      {
        'base_url': BASE_URL
      },
    )
    service = TestBed.inject(CountriesService);
    envService = TestBed.inject(EnvironmentService)
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    const interceptor: UrlInterceptor = TestBed.inject(UrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
  it('should intercept and append base url', (done: DoneFn) => {
    const interceptor: UrlInterceptor = TestBed.inject(UrlInterceptor);
    let response: HttpResponse<any> | undefined = undefined;

    const next: any = {
      handle: (responseHandle: any) => {
        response = responseHandle;

      }
    };
    const request: HttpRequest<any> = new HttpRequest<any>("GET", `/all`);

    interceptor.intercept(request, next);
    done()
  });
});



