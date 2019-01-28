import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {LoginService} from '../services/login/login.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppError} from '../models/error.model';
import {ConfigGetterService} from '../services/config-getter.service';
import {CaptchaModel, DevCredentialsModel} from '../models/config.model';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private devCredentials: DevCredentialsModel;

  public loginForm: FormGroup;
  public captcha: CaptchaModel;
  public loading: boolean;
  public dataErrors: string[] = [];

  constructor(private fb: FormBuilder,
              private authService: LoginService,
              private router: Router,
              private configGetterService: ConfigGetterService) {

  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  private addDataError(error: AppError): void {
    this.dataErrors.push('[' + error.httpStatus + ']: ' + error.message);
  }

  private clearDataErrors(): void {
    this.dataErrors = [];
  }

  public handleLogin(): void {
    this.clearDataErrors();
    this.loading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.captcha)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((login: any) => {
        console.log('login', login);
        this.router.navigate(['']);
      }, err => {
        this.addDataError(err);
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public captchaResolved(captcha: string): void {
    console.log('captcha', captcha);
    this.loginForm.get('captcha').patchValue(captcha);
  }

  public useDefaultsClick(): void {
    this.email.patchValue(this.devCredentials.email);
    this.password.patchValue(this.devCredentials.password);
  }

  ngOnInit() {
    this.initForm();
    this.devCredentials = this.configGetterService.devCredentials;
    this.captcha = this.configGetterService.captcha;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
