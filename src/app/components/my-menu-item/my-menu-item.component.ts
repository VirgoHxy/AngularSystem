import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../app.config';
import { MyBodyComponent } from '../my-body/my-body.component'
import { getCurrRoute }  from '../../plugins/angularUtils.plugin'

@Component({
  selector: 'app-my-menu-item',
  templateUrl: './my-menu-item.component.html',
  styleUrls: ['./my-menu-item.component.scss']
})
export class MyMenuItemComponent implements OnInit {

  @Input() item!: Menu;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private myBodyComponent : MyBodyComponent) { }

  ngOnInit() {
  }

  changeRoute() {
    let currRoute = getCurrRoute(this.router);
    if (currRoute.name != this.item.name) {
      this.router.navigate([this.item.name], { relativeTo: this.activatedRoute });
    } else {
      this.myBodyComponent.reload();
    }
  }

}
