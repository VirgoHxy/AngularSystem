import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { APP_CONFIG, AppConfig } from '@app/app.config';
import { AccountInfo } from '@app/interface';
import { SET_ACCOUNTINFO, SET_ACCOUNTDATA } from '@stores/login/action';
import { AppStore } from '@stores/index';
import {
  setExpireStorage,
  getExpireStorage,
} from '@plugins/storage.plugin';
import { forbiddenTextValidator } from '@directives/shared/forbidden-text.directive';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // 全局配置
  appConfig: AppConfig;

  // new 实例创建
  // loginForm = new FormGroup({
  //   account: new FormControl(''),
  //   password: new FormControl('')
  // })

  // FormBuilder 创建
  loginForm = this.fb.group({
    account: ['', [Validators.required, forbiddenTextValidator(/demo/i)]],
    password: ['', Validators.required],
    others: this.fb.array([this.fb.control('')]),
  });

  // 获取 accountAbstractControl 对象
  get account(): AbstractControl {
    return this.loginForm.get('account')!;
  }

  // 获取 passwordAbstractControl 对象
  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  // 获取 othersFormArray 数组
  get others() {
    return this.loginForm.get('others') as FormArray;
  }

  constructor(
    @Inject(APP_CONFIG) appConfig: AppConfig,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private store: Store<AppStore>
  ) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    // 获取片段
    this.activatedRoute.fragment
      .pipe(map((fragment) => fragment || 'normal'))
      .subscribe((data) => console.log('fragment:' + data));
    // 获取参数
    this.activatedRoute.queryParamMap
      .pipe(map((params) => params.get('id') || 'normal'))
      .subscribe((data) => console.log('id:' + data));
    // 获取缓存
    this.getStorage();
  }

  addOthers() {
    // 动态增减
    this.others.push(this.fb.control(''));
  }

  removeOthers(index: number) {
    // 动态增减
    this.others.removeAt(index);
  }

  // 获取缓存
  enterLogin(event: KeyboardEvent) {
    if (event.code == 'Enter') {
      this.login();
    }
  }

  // 获取缓存
  getStorage() {
    let accountInfo: AccountInfo = getExpireStorage(sessionStorage, 'accountInfo');
    if (accountInfo) {
      this.loginForm.patchValue({
        account: accountInfo.account,
        password: accountInfo.password,
      });
    }
  }

  // 登录
  async login() {
    let { account, password } = this.loginForm.value;
    this.loadingService.change(true, '登录验证中,请稍等...');
    let checkLogin = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          ['admin', 'city', 'group', 'project'].indexOf(account) != -1 &&
          password
        ) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
    this.loadingService.change(false);
    if (checkLogin) {
      this.loginSuccess();
    } else {
      alert('账号密码错误');
    }
  }

  // 登录成功
  loginSuccess() {
    let { account, password } = this.loginForm.value;
    let accountInfo = {
      account: account,
      password: password,
    };
    let accountData = {
      name: account,
      type: this.appConfig.accountType.demo(account),
    };
    setExpireStorage(sessionStorage, 'accountInfo', accountInfo);
    setExpireStorage(sessionStorage, 'accountData', accountData);
    setExpireStorage(sessionStorage, 'accountRole', true);
    this.store.dispatch(SET_ACCOUNTINFO({payload: accountInfo}));
    this.store.dispatch(SET_ACCOUNTDATA({payload: accountData}));
    this.router.navigate(['home']);
  }
}
