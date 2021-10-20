import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

// url拦截器
@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  // 获取环境配置的 api.host
  apiHost = environment.api ? environment.api.host : '';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiHostReq = req.clone({ url: `${this.apiHost}${req.url}` });
    // 走向下一个拦截器
    return next.handle(apiHostReq);
  }
}