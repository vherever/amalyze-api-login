export interface ConfigModel {
  apiUrl: string;
  dev_credentials: DevCredentialsModel;
  captcha: CaptchaModel;
}
export interface DevCredentialsModel {
  email: string;
  password: string;
}
export interface CaptchaModel {
  sitekey: string;
  theme: string;
}
