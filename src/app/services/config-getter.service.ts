import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {CaptchaModel, DevCredentialsModel} from '../models/config.model';

@Injectable()
export class ConfigGetterService {
  constructor(protected configService: ConfigService) {}

  public get apiUrl(): string {
    return this.configService.config.apiUrl;
  }

  public get devCredentials(): DevCredentialsModel {
    return this.configService.config.dev_credentials;
  }

  public get captcha(): CaptchaModel {
    return this.configService.config.captcha;
  }
}
