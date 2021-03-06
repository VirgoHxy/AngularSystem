import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { APP_CONFIG, AppConfig } from '@app/app.config'
import { AccountData } from '@app/interface'
import { setExpireStorage, getExpireStorage } from '@plugins/storage.plugin'
import { AppStore } from '@stores/index';

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.scss']
})
export class MyHeaderComponent implements OnInit {
  // 全局配置
  appConfig: AppConfig;
  // 账号数据
  accountData!: AccountData;
  // 账号数据列表 循环展示使用
  accountDataList: Array<{
    key: string;
    value: string;
  }> = [];

  constructor(@Inject(APP_CONFIG) appConfig: AppConfig, private router: Router, private store: Store<AppStore>) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    console.log('header初始化')
    let accountData = getExpireStorage(sessionStorage, 'accountData');
    if (accountData) {
      this.accountData = accountData;
      this.getAccountDataList();
    }
    this.store.select('login').subscribe((state) => {
      let {accountInfo, accountData} = state;
      console.log(accountInfo)
      console.log(accountData)
    });
  }

  // 将对象转换为数组
  getAccountDataList() {
    forName: for (const key in this.accountData) {
      let listObj = {
        key: '',
        value: ''
      };
      switch (key) {
        case 'type':
          listObj.key = '类型';
          listObj.value = this.appConfig.accountType.getTypeText(Number(this.accountData[key]));
          break;
        case 'name':
          listObj.key = '名称';
          listObj.value = this.accountData[key];
          break;

        default:
          continue forName;
      }
      this.accountDataList.push(listObj);
    }
  }

  change() {
    let theme = document.documentElement.getAttribute('data-theme');
    theme = theme == 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    setExpireStorage(localStorage, 'theme', theme);
  }

  // 退出
  exit() {
    this.router.navigate(['/'], {
      queryParams: { id: +new Date() },
      fragment: 'exit'
    });
    // sessionStorage.removeItem("accountData");
  }
}
