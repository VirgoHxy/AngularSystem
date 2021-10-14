import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG, AppConfig, AccountData } from '../../app.config'
import { Router } from '@angular/router';
import { setExpireStorage, getExpireStorage } from '../../plugins/storage.plugin'

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.scss']
})

export class MyHeaderComponent implements OnInit {
  
  config: AppConfig;

  accountData!: AccountData;

  accountDataList: Array<{
    key: string;
    value: string;
  }> = [];

  constructor(@Inject(APP_CONFIG) config: AppConfig, private router: Router) {
    this.config = config;
  }

  ngOnInit() {
    // console.log("header初始化")

    let accountData = getExpireStorage(sessionStorage, "accountData");
    if (accountData) {
      this.accountData = accountData;
      this.getAccountDataList();
    }
  }

  getAccountDataList() {
    forName: for (const key in this.accountData) {
      let listObj = {
        key: "",
        value: ""
      };
      switch (key) {
        case "type":
          listObj.key = "类型";
          listObj.value = this.config.accountType.getTypeText(Number(this.accountData[key]));
          break;
        case "name":
          listObj.key = "名称";
          listObj.value = this.accountData[key];
          break;
      
        default:
          continue forName;
      }
      this.accountDataList.push(listObj);
    }
  }
  
  exit() {
    this.router.navigate(["/"], {
      queryParams: { id: +new Date() },
      fragment: 'exit'
    });
    // sessionStorage.removeItem("accountData");
  }
}
