import { Injectable, Optional } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../services/environment.service';


@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  /**
  * Creates an instance of the UrlInterceptor which @implements the class HttpInterceptor
  *
  * @param {EnvironmentService} config Injected instance of EnvironmentService
  */
  constructor(@Optional() private config: EnvironmentService) {
  }

  /**
   * Intercepts and prepends base_url from EnvironmentService if request does not begin with http:// or https://
   * @param req  The outgoing request object to handle.
   * @param next
   * The next interceptor in the chain, or the backend if no interceptors remain in the chain.
   *@returns {Observable}  An observable of the event stream.
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ url: this.prepareUrl(req.url) });
    return next.handle(req);
  }

  /**
  * Checks if url passed is absolute(i.e begins with http:// or https://)
  * @param url  The url of a request.
  * @returns {boolean} Returns true if url is absolute, false otherwise.
  */
  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = new RegExp("^(http|https)://", "i");
    return absolutePattern.test(url);
  }

  /**
  * Appends base_url from EnvironmentService if url does not start with http:// or https://
  * @param url  The url of a request.
  * @returns {string} Returns the prepared url of a request
  */
  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this.config.base_url + '/' + url;
    return url
  }
}
