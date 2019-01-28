import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {Observable} from 'rxjs';
import {AppError} from '../../models/error.model';

@Injectable()
export abstract class LoginService extends BaseService {
  private headers: any;

  abstract fetchAuthToken(email: string, password: string, captcha: string): Observable<any>;

  private setHeaders(authData: any): any {
    this.headers = {
      'X-FALCON-TOKEN': authData.headers.get('X-FALCON-TOKEN'),
      'X-XSRF-TOKEN': authData.headers.get('X-XSRF-TOKEN')
    };
  }

  isAuthenticated(): boolean {
    return !!this.headers;
  }

  getHeaders(): string {
    if (this.headers === undefined) {
      return null;
    } else {
      return this.headers;
    }
  }

  login(email: string, password: string, captcha: string): Observable<void> {
    return new Observable<void>(observer => {
      this.fetchAuthToken(email, password, captcha).subscribe((authData: any) => {
        if (authData.body.request && authData.body.request.success) {
          this.setHeaders(authData);
          observer.next(authData);
          observer.complete();
        } else {
          const err = new AppError();
          err.message = 'Unable to login';
          observer.error(err);
        }
      }, err => {
        observer.error(err);
      });
    });
  }
}
