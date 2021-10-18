import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '@app/app.config';
import { MyBodyComponent } from '../my-body/my-body.component'
import { getCurrRoute }  from '@services/angularUtils.service'

@Component({
  selector: 'app-my-menu-item',
  templateUrl: './my-menu-item.component.html',
  styleUrls: ['./my-menu-item.component.scss']
})
export class MyMenuItemComponent implements OnInit {
  // 输入单个侧边栏
  @Input() menu!: Menu;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private myBodyComponent : MyBodyComponent) { }

  ngOnInit() {
  }

  // 路由导航
  changeRoute() {
    let currRoute = getCurrRoute(this.router);
    if (currRoute.name != this.menu.name) {
      this.router.navigate([this.menu.name], { relativeTo: this.activatedRoute });
    } else {
      // 重载当前路由
      this.myBodyComponent.reload();
    }
  }

}
