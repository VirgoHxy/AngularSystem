import { CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { setExpireStorage, getExpireStorage } from './storage.plugin'

// 授权验证服务
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private loggerService: LoggerService, private router: Router) { }

  // 检测登录
  checkLogin(route?: ActivatedRouteSnapshot):Observable<boolean> {
    return new Observable((observer) => {
      // 拥有登录数据
      if (!getExpireStorage(sessionStorage, 'accountData')) {
        this.loggerService.log((route ? route.url : '') + '未登录，返回到登录页');
        this.router.navigate(['/'], {
          queryParams: { id: +new Date() },
          fragment: 'auth'
        });
        observer.next(false);
      } else {
        observer.next(true);
        observer.complete();
      }
    });
  }

  // 检测权限
  checkAuth(route: ActivatedRouteSnapshot):Observable<boolean> {
    return new Observable((observer) => {
      // 拥有数据
      let isLogin = this.checkLogin(route);
      isLogin.subscribe({
        next: flag => {
          if (flag) {
            if (!getExpireStorage(sessionStorage, 'accountRole')) {
              this.loggerService.log(route.url + '没有权限');
              observer.next(false);
            } else {
              observer.next(true);
            }
          } else {
            observer.next(false);
          }
          observer.complete();
        }
      })
    });
  }

  // 是否可激活路由 false也会加载
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    // 判断是否可以访问当前连接
    return this.checkAuth(route);
  }
  
  // 是否可激活子路由
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    // 判断是否可以访问当前连接
    return this.checkAuth(route);
  }

  // 是否可加载
  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

}