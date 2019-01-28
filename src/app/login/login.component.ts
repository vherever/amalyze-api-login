import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {LoginService} from '../services/login/login.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public loginForm: FormGroup;
  public loading: boolean;

  constructor(private fb: FormBuilder,
              private authService: LoginService,
              private router: Router) {

  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  public handleLogin(): void {
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
    this.email.patchValue('developertest2@amalyze.com');
    this.password.patchValue('oM9uolee');
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
