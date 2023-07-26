import { InjectionToken } from "@angular/core";
import { AppConfig } from "./appConfig.interface";
import { environment } from '../../environments/environment'

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config')

export const APP_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint
}
