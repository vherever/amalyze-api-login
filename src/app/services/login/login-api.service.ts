import {Injectable} from '@angular/core';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class LoginApiService extends LoginService {
  constructor(protected http: HttpClient) {
    super();
  }

  fetchAuthToken(email: string, password: string, captcha: string): Observable<any> {
    return this.http.post(this.getApiUrl('/system.user.login'),
      {username: email, password_md5: Md5.hashStr(password), captcha: captcha},
      {observe: 'response'})
      .pipe(catchError(this.handleHttpError<any>()));
  }
}
