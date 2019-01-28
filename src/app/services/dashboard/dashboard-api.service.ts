import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DashboardService} from './dashboard.service';
import {catchError, map} from 'rxjs/operators';
import {ConfigGetterService} from '../config-getter.service';

@Injectable()
export class DashboardApiService extends DashboardService {
  constructor(protected http: HttpClient,
              protected configGetterService: ConfigGetterService) {
    super(configGetterService);
  }

  public getUserStatus(): Observable<any> {
    return this.http.get(this.getApiUrl('/system.user.status'))
      .pipe(
        map((res: any) => res.user),
        catchError(this.handleHttpError<any>())
      );
  }
}
