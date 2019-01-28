import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { LoginService } from './login/login.service';
import {Observable} from 'rxjs';

@Injectable()
export class AppAuthInterceptor implements HttpInterceptor {
  constructor(private auth: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getHeaders() !== null) {
      request = request.clone({
        setHeaders: {
          'X-FALCON-TOKEN': this.auth.getHeaders()['X-FALCON-TOKEN'],
          'X-XSRF-TOKEN': this.auth.getHeaders()['X-XSRF-TOKEN'],
        }
      });
    }
    return next.handle(request);
  }
}
