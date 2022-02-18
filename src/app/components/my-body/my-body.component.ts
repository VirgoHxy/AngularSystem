import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ReloadService } from '@services/reload.service';
import { AppStore } from '@stores/index';

@Component({
  selector: 'app-my-body',
  templateUrl: './my-body.component.html',
  styleUrls: ['./my-body.component.scss'],
})
export class MyBodyComponent implements OnInit {
  reloadFlag: boolean = true; // 重载

  constructor(
    private reloadService: ReloadService,
    private store: Store<AppStore>
  ) {
    this.reloadService.currentReload.subscribe((flag) => {
      setTimeout(() => {
        this.reloadFlag = flag;
      });
    });
    this.store.select('login').subscribe((state) => {
      let { accountInfo, accountData } = state;
      console.log(accountInfo);
      console.log(accountData);
    });
  }

  // 初始化
  ngOnInit() {
    console.log('body初始化');
  }
}
