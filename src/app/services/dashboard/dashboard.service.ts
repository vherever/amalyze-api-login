import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from '../base.service';

@Injectable()
export abstract class DashboardService extends BaseService {
  abstract getUserStatus(): Observable<any>;
}
