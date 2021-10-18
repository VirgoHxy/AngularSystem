// http 拦截器
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// 空拦截器
import { NoopInterceptor } from './noop-interceptor';
// 记录拦截器
import { LoggingInterceptor } from './logging-interceptor';
// 授权token拦截器
import { AuthInterceptor } from './auth-interceptor';

// 统一应用拦截器
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];