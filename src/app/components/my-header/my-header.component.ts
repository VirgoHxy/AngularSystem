import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig, AccountData } from '@app/app.config'
import { setExpireStorage, getExpireStorage } from '@services/storage.service'
import { ConfigService, Config } from '@services/config.service'

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.scss'],
  providers: [ConfigService]
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
  // json配置
  config: Config = {
    url: ''
  };

  constructor(@Inject(APP_CONFIG) appConfig: AppConfig, private router: Router, private configService: ConfigService) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    // console.log("header初始化")
    let accountData = getExpireStorage(sessionStorage, 'accountData');
    if (accountData) {
      this.accountData = accountData;
      this.getAccountDataList();
      // this.showConfig();
      this.showConfigResponse();
    }
  }

  // 获取配置 body
  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => {
        console.log(data);
        console.log(data.url);
        this.config = { ...data };
      });
  }

  // 获取配置项 body
  showConfigItem(key: string) {
    this.configService.searchConfig(key)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  // 获取配置整个 response
  showConfigResponse() {
    this.configService.getConfigResponse()
      .subscribe(resp => {
        const keys = resp.headers.keys();
        const headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        console.log(resp);
        console.log(resp.status);
        console.log(resp.body);
        console.log(headers);

        this.config = { ...resp.body! };
      });
  }

  // 添加编辑配置
  addOrupdateConfig(url: string) {
    this.configService
      .addOrUpdateConfig({
        url
      })
      .subscribe(data => {
        console.log(data);
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

  // 退出
  exit() {
    this.router.navigate(['/'], {
      queryParams: { id: +new Date() },
      fragment: 'exit'
    });
    // sessionStorage.removeItem("accountData");
  }
}
