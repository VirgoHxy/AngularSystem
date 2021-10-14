import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { APP_CONFIG, AppConfig } from '../../app.config'
import { map } from 'rxjs/operators';
import { forbiddenTextValidator } from '../../directive/forbidden-text.directive'
import { setExpireStorage, getExpireStorage } from '../../plugins/storage.plugin'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  config: AppConfig;

  // loginForm = new FormGroup({
  //   account: new FormControl(''),
  //   password: new FormControl('')
  // })

  loginForm = this.fb.group({
    account: ['', [Validators.required, forbiddenTextValidator(/demo/i)]],
    password: ['', Validators.required],
    others: this.fb.array([
      this.fb.control('')
    ])
  })

  get account(): AbstractControl {
    return this.loginForm.get('account')!;
  }
  
  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

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
      this.toHome();
    } else {
      alert("账号密码错误")
    }
  }

  getStorage() {
    let accountData = getExpireStorage(sessionStorage, "accountData");
    if (accountData) {
      this.loginForm.patchValue({
        account: accountData.account
      })
    }
  }

  toHome() {
    let { account, password } = this.loginForm.value;
    setExpireStorage(sessionStorage, "accountData", {
      account: account,
      password: password,
      name: account,
      type: 0
    });
    setExpireStorage(sessionStorage, "accountRole", true);
    this.router.navigate(["home"]);
  }

}

