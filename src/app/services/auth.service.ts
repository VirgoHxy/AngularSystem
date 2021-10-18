import { Injectable } from '@angular/core';

/**
 * 授权
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // 获取token
  getAuthorizationToken() {
    return +new Date() + '';
  }
}
