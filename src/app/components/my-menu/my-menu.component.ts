import { Component, OnInit, Inject, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators';
import { APP_MENU, AppMenu, Menu } from '@app/app.config';
import { getCurrRoute }  from '@services/angularUtils.service'

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.scss']
})
export class MyMenuComponent implements OnInit {
  // 侧边栏对象
  menu: AppMenu;
  // 侧边栏列表
  menuList: Array<Menu> = [];
  // 当前侧边栏
  currMenu!: Menu;

  constructor(@Inject(APP_MENU) menu: AppMenu, private router: Router) { 
    this.menu = menu;
  }

  // 初始化
  ngOnInit() {
    // 侧边栏初始化
    this.menu.menuList.forEach(element => {
      let ele = JSON.parse(JSON.stringify(element));
      this.menuList.push(Object.assign(ele, {
        active: false
      }))
    });
    // 获取当前路由
    let currRoute = getCurrRoute(this.router);
    this.changeActive(currRoute.name, true);
    // 订阅路由事件
    this.subscribeNavigationEnd();
    this.subscribeNavigationStart();
    this.subscribeNavigationCancel();
  }

  // 循环跟踪事件
  trackByFn(index: number, item: Menu): string { return item.name; }

  // 导航结束
  subscribeNavigationEnd() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe(() => {
      let currRoute = getCurrRoute(this.router);
      this.changeActive(currRoute.name, true);
    });
  }

  // 导航开始
  subscribeNavigationStart() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationStart)).subscribe(() => {
      let currRoute = getCurrRoute(this.router);
      this.changeActive(currRoute.name, false);
    });
  }

  // 导航取消
  subscribeNavigationCancel() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationCancel)).subscribe(() => {
      this.changeActive(this.currMenu.name, true);
    });
  }

  // 改变路由 active 状态
  changeActive(name: string, active: boolean) {
    let menu = this.menuList.find(ele => ele.name == name);
    if (menu) {
      menu.active = active;
      this.currMenu = menu;
    } else {
      console.log('未获取到menu')
    }
  }

}
