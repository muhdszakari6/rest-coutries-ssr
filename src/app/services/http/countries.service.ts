import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Country } from 'src/app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  /**
  * Creates an instance of the CountriesService
  *
  * @param {HttpClient} http Injected instance of HttpClient
  */
  constructor(private http: HttpClient) { }

  /**
  * Sends a GET request to /all endpoint.
  * @remark
  * to get all countries.
  * @returns {Observable<Country[]>} Returns an observable that emits all countries if successful.
  */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('all')
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  /**
  * Sends a GET request to /name/:name endpoint.
  * @remark
  * to search countries.
  *  @param {string} country Keyword to use and search countries.
  * @returns {Observable<Country[]>} Returns an observable that emits found countries if successful.
  */
  searchCountries(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`name/${country}`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }


  /**
  * Sends a GET request to /name/:name?fullText=true endpoint.
  * @remark
  * to search country by its fullText.
  *  @param {string} country Keyword to use and search country.
  * @returns {Observable<Country[]>} Returns an observable that emits found country if successful.
  */
  getCountryByFullText(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`name/${country}?fullText=true`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }


  /**
 * Sends a GET request to /alpha?codes={string},{string}... endpoint.
 * @remark
 * to get border countries.
 *  @param {string[]} borderCodes Keywords to use and search countries.
 * @returns {Observable<Country[]>} Returns an observable that emits found countries if successful.
 */
  getBorderCountries(borderCodes: string[]): Observable<Country[]> {
    return this.http.get<Country[]>(`alpha?codes=${borderCodes?.join(",")}`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  /**
 * Sends a GET request to /region/${region} endpoint.
 * @remark
 * to get countries by region.
 *  @param {string} region Keywords to use and get countries by region.
 * @returns {Observable<Country[]>} Returns an observable that emits found countries in region if successful.
 */
  filterByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`region/${region}`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  /**
   * Contructs proper error message and rethrows error
   *  @param {any} err Error Object.
   * @returns {Observable<never>} Returns an observable.
   */
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
