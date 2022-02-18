import {
  Component,
  OnInit,
  Inject,
  OnChanges,
  DoCheck,
  OnDestroy,
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
} from '@angular/router';
import { filter } from 'rxjs/operators';

import { APP_MENU, AppMenu, Menu, APP_DI_MENU } from '@views/home/home.config';
import { getCurrRoute } from '@plugins/angularUtils.plugin';

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.scss'],
  providers: [{ provide: APP_MENU, useValue: APP_DI_MENU }],
})
export class MyMenuComponent implements OnInit {
  // 侧边栏对象
  appMenu: AppMenu;
  // 侧边栏列表
  menuList: Array<Menu> = [];
  // 当前侧边栏
  currMenu!: Menu;

  constructor(@Inject(APP_MENU) appMenu: AppMenu, private router: Router) {
    this.appMenu = appMenu;
  }

  // 初始化
  ngOnInit() {
    // 侧边栏初始化
    this.appMenu.menuList.forEach((element) => {
      let ele = JSON.parse(JSON.stringify(element));
      this.menuList.push(ele);
    });
    // 获取当前路由
    this.setCurrMenu();
    // 订阅路由事件
    this.subscribeNavigationEnd();
    this.subscribeNavigationStart();
    this.subscribeNavigationCancel();
  }

  // 循环跟踪事件
  trackByFn(index: number, item: Menu): string {
    return item.name;
  }

  // 导航结束
  subscribeNavigationEnd() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCurrMenu();
      });
  }

  // 导航开始
  subscribeNavigationStart() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationStart))
      .subscribe(() => {
        this.setCurrMenu();
      });
  }

  // 导航取消
  subscribeNavigationCancel() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationCancel))
      .subscribe(() => {
        this.setCurrMenu(this.currMenu.name);
      });
  }

  // 赋值当前路由
  setCurrMenu(name?: string) {
    name = name ? name : getCurrRoute(this.router).name;
    let menu = this.menuList.find((ele) => ele.name == name);
    if (menu) {
      this.currMenu = menu;
    } else {
      console.log('未获取到menu');
    }
  }
}
