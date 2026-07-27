import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, throwError } from 'rxjs';
import { ApiResponse, Country } from 'src/app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<ApiResponse<Country[]>>('?limit=100')
      .pipe(
        map(res => res.data.objects),
        catchError(err => this.errorHandler(err)),
      );
  }

  searchCountries(country: string): Observable<Country[]> {
    return this.http.get<ApiResponse<Country[]>>(`?q=${country}`)
      .pipe(
        map(res => res.data.objects),
        catchError(err => this.errorHandler(err)),
      );
  }

  getCountryByFullText(country: string): Observable<Country[]> {
    return this.http.get<ApiResponse<Country[]>>(`/names.common/${country}`)
      .pipe(
        map(res => res.data.objects),
        catchError(err => this.errorHandler(err)),
      );
  }

  getBorderCountries(borderCodes: string[]): Observable<Country[]> {
    if (!borderCodes?.length) {
      return of([]);
    }
    return forkJoin(
      borderCodes.map(code =>
        this.http.get<ApiResponse<Country[]>>(`/codes.alpha_3/${code}`)
          .pipe(map(res => res.data.objects[0]))
      )
    ).pipe(
      catchError(err => this.errorHandler(err)),
    );
  }

  filterByRegion(region: string): Observable<Country[]> {
    return this.http.get<ApiResponse<Country[]>>(`/region/${region}`)
      .pipe(
        map(res => res.data.objects),
        catchError(err => this.errorHandler(err)),
      );
  }

  private errorHandler(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error?.message}`;
    } else {
      errorMessage = `${err.statusText}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }

}
