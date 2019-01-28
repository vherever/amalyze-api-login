import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../services/dashboard/dashboard.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UserModel} from '../models/user.model';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public user: UserModel;
  public loading: boolean;

  constructor(private dashboardService: DashboardService) {

  }

  private loadUserStatus(): void {
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
