import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../services/dashboard/dashboard.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UserModel} from '../models/user.model';
import {AppError} from '../models/error.model';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public user: UserModel;
  public loading: boolean;
  public dataErrors: string[] = [];

  constructor(private dashboardService: DashboardService) {

  }

  private addDataError(error: AppError): void {
    this.dataErrors.push('[' + error.httpStatus + ']: ' + error.message);
  }

  private clearDataErrors(): void {
    this.dataErrors = [];
  }

  private loadUserStatus(): void {
    this.clearDataErrors();
    this.loading = true;
    this.dashboardService.getUserStatus()
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((user: UserModel) => {
        console.log('user', user);
        this.user = user;
      }, err => {
        this.addDataError(err);
      });
  }

  ngOnInit() {
    this.loadUserStatus();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
