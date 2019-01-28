import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login/login.service';
import {LoginApiService} from './services/login/login-api.service';
import {AuthGuard} from './services/auth-guard.service';
import {AppAuthInterceptor} from './services/auth-interceptor.service';
import {DashboardService} from './services/dashboard/dashboard.service';
import {DashboardApiService} from './services/dashboard/dashboard-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppAuthInterceptor,
      multi: true
    },
    {provide: LoginService, useClass: LoginApiService},
    {provide: DashboardService, useClass: DashboardApiService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
