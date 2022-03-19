import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Country } from 'src/app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  constructor(private http: HttpClient) { }


  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('/all')
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  searchCountries(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`/name/${country}`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  getCountryByFullText(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`/name/${country}?fullText=true`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }


  getBorderCountries(borderCodes: string[]): Observable<Country[]> {
    return this.http.get<Country[]>(`/alpha?codes=${borderCodes?.join(",")}`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  filterByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`/region/${region}`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }


  private errorHandler(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error?.message}`;
    } else {
      errorMessage = `${err.statusText}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }



}
