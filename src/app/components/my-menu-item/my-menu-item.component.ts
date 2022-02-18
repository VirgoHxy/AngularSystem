import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Menu } from '@views/home/home.config';
import { getCurrRoute } from '@plugins/angularUtils.plugin';
import { ReloadService } from '@services/reload.service';

@Component({
  selector: 'app-my-menu-item',
  templateUrl: './my-menu-item.component.html',
  styleUrls: ['./my-menu-item.component.scss'],
})
export class MyMenuItemComponent implements OnInit {
  // 输入单个侧边栏
  @Input() menu!: Menu;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reloadService: ReloadService
  ) {}

  ngOnInit() {}

  // 路由导航
  changeRoute() {
    let currRoute = getCurrRoute(this.router);
    if (currRoute.name != this.menu.name) {
      this.router.navigate([this.menu.name], {
        relativeTo: this.activatedRoute,
      });
    } else {
      // 重载当前路由
      this.reloadService.reload();
    }
  }
}
