import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigModel} from '../models/config.model';

@Injectable()
export class ConfigService {
  private appConfig;
  private http;

  constructor(private injector: Injector) {
    this.http = this.injector.get(HttpClient);
  }

  public loadAppConfig() {
    const config = '../assets/config.json';

    return this.http.get(config)
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  public get config(): ConfigModel {
    return this.appConfig;
  }

}
