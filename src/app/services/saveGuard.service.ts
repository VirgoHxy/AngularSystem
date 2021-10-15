import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

// 未保存离开服务 全局注册

// 引入弹窗服务
import { DialogService } from './dialog.service';
// 引入组件
import { HomePageComponent } from '../views/home/homeChildren/home-page/home-page.component';

@Injectable({
  providedIn: 'root',
})
export class SaveGuard implements CanDeactivate<HomePageComponent> {

  constructor(private dialogService: DialogService) { }

  canDeactivate(
    component: HomePageComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    // 通过 HomePageComponent 的 canDeactivate 方法判断
    if (component.canDeactivate()) {
      return true;
    }
    // 返回 Observable 类型
    return this.dialogService.confirm('确认不保存这些数据?');
  }
}