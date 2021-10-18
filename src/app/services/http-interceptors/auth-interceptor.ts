import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

// token授权
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 获取token
    const authToken = this.auth.getAuthorizationToken();

    // 克隆请求
    let authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    // 设置请求头
    if (true) {
      const newAuthToken = this.auth.getAuthorizationToken();
      authReq = authReq.clone({ setHeaders: { Authorization: newAuthToken } });
    }
    
    // 发给下个拦截器
    return next.handle(authReq);
  }
}