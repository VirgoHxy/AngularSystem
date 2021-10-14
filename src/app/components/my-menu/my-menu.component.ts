import { Component, OnInit, Inject, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators';
import { APP_MENU, AppMenu, Menu } from '../../app.config';
import { getCurrRoute }  from '../../plugins/angularUtils.plugin'

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.component.html',
  styleUrls: ['./my-menu.component.scss']
})
export class MyMenuComponent implements OnInit, OnChanges, DoCheck, OnDestroy {

  menu: AppMenu;
  menuList: Array<Menu> = [];
  currMenu!: Menu;

  constructor(@Inject(APP_MENU) menu: AppMenu, private router: Router) { 
    this.menu = menu;
  }

  // 输入变化监听 
  ngOnChanges() {

  }

  // 初始化
  ngOnInit() {
    this.menu.menuList.forEach(element => {
      let ele = JSON.parse(JSON.stringify(element));
      this.menuList.push(Object.assign(ele, {
        active: false
      }))
    });
    let currRoute = getCurrRoute(this.router);
    this.changeActive(currRoute.name, true);
    this.subscribeNavigationEnd();
    this.subscribeNavigationStart();
    this.subscribeNavigationCancel();
  }

  // 自定义变化监听
  ngDoCheck() {

  }

  // 实例注销
  ngOnDestroy() {

  }

  trackByFn(index: number, item: Menu): string { return item.name; }

  subscribeNavigationEnd() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe(() => {
      let currRoute = getCurrRoute(this.router);
      this.changeActive(currRoute.name, true);
    });
  }

  subscribeNavigationStart() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationStart)).subscribe(() => {
      let currRoute = getCurrRoute(this.router);
      this.changeActive(currRoute.name, false);
    });
  }

  subscribeNavigationCancel() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationCancel)).subscribe(() => {
      this.changeActive(this.currMenu.name, true);
    });
  }

  changeActive(name: string, active: boolean) {
    let menu = this.menuList.find(ele => ele.name == name);
    if (menu) {
      menu.active = active;
      this.currMenu = menu;
    } else {
      console.log("未获取到menu")
    }
  }

}
