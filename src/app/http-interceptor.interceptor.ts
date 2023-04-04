import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const updatedReq = request.clone({
      headers: request.headers
        .append('Accept', 'application/json')
        .append('X-CoinAPI-Key', 'B0539084-6C7D-4CED-A6AC-B4B12464ADAE')
      });
    return next.handle(updatedReq);
  }
}
