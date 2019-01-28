import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {SharedModule} from '../shared.module';
import {RecaptchaModule} from 'ng-recaptcha';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    SharedModule,
    RecaptchaModule
  ]
})
export class LoginModule {

}
