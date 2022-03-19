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
  constructor(@Optional() private config: EnvironmentService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ url: this.prepareUrl(req.url) });
    return next.handle(req);
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = new RegExp("^(http|https)://", "i");
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this.config.base_url + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}
