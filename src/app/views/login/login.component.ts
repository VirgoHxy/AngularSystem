import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { APP_CONFIG, AppConfig } from '@app/app.config'
import { map } from 'rxjs/operators';
import { forbiddenTextValidator } from '@directives/forbidden-text.directive'
import { setExpireStorage, getExpireStorage } from '@services/storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  // 全局配置
  config: AppConfig;

  // new 实例创建
  // loginForm = new FormGroup({
  //   account: new FormControl(''),
  //   password: new FormControl('')
  // })

  // FormBuilder 创建
  loginForm = this.fb.group({
    account: ['', [Validators.required, forbiddenTextValidator(/demo/i)]],
    password: ['', Validators.required],
    others: this.fb.array([
      this.fb.control('')
    ])
  })

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

  constructor(@Inject(APP_CONFIG) config: AppConfig, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.config = config;
  }

  ngOnInit() {
    // 获取片段
    this.activatedRoute
      .fragment
      .pipe(map(fragment => fragment || 'normal')).subscribe(data => console.log('fragment:' + data));
    // 获取参数
    this.activatedRoute
      .queryParamMap
      .pipe(map(params => params.get('id') || 'normal')).subscribe(data => console.log('id:' + data));
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

  // 登录
  async login() {
    let { account, password } = this.loginForm.value;
    let checkLogin = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (account == 1 && password == 1) {
          resolve(true);
        } else {
          resolve(false)
        }
      }, 1000);
    })
    if (checkLogin) {
      this.loginSuccess();
    } else {
      alert('账号密码错误')
    }
  }

  // 获取缓存
  getStorage() {
    let accountData = getExpireStorage(sessionStorage, 'accountData');
    if (accountData) {
      this.loginForm.patchValue({
        account: accountData.account
      })
    }
  }

  // 登录成功
  loginSuccess() {
    let { account, password } = this.loginForm.value;
    setExpireStorage(sessionStorage, 'accountData', {
      account: account,
      password: password,
      name: account,
      type: 0
    });
    setExpireStorage(sessionStorage, 'accountRole', true);
    this.router.navigate(['home']);
  }

}

