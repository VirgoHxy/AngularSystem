import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel }  from '@components/shared/my-form/my-form-base'
import { LoginItemService } from './loginIModel.service';
import { RegisterItemService } from './registerModel.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [LoginItemService, RegisterItemService]
})
export class FormComponent implements OnInit {
  // 登录表单组
  loginForm!: FormGroup;
  // 注册表单组
  registerForm!: FormGroup;
  // 登录表单模型
  loginFormModel: FormModel;
  // 注册表单模型
  registerFormModel: FormModel;

  constructor(lis: LoginItemService, ris: RegisterItemService) {
    // 赋值模型
    this.loginFormModel = lis.getFormModel();
    this.registerFormModel = ris.getFormModel();
  }

  ngOnInit() {
    console.log('form: 初始化');
  }

  // 表单事件
  formEvent(arg: {
    name: string
    type: string
    data?: any
  }) {
    let { name, type, data } = arg;
    switch (name) {
      case 'login':
        switch (type) {
          case 'formInit':
            this.loginFormInit(data);
            break;
          case 'formBtn':
            this.loginFormBtn(data);
            break;
          default:
            break;
        }
        break;
      case 'register':
        switch (type) {
          case 'formInit':
            this.registerFormInit(data);
            break;
          case 'formBtn':
            this.registerFormBtn(data);
            break;
          default:
            break;
        }
        break;
    
      default:
        break;
    }

  }

  // 初始化
  loginFormInit(form: FormGroup) {
    this.loginForm = form;
  }

  // 按钮
  loginFormBtn(btnName: string) {
    console.log(btnName);
    console.log(this.loginForm.getRawValue())
  }

  // 初始化
  registerFormInit(form: FormGroup) {
    this.registerForm = form;
  }
  
  // 按钮
  registerFormBtn(btnName: string) {
    console.log(btnName);
    console.log(this.registerForm.getRawValue())
  }

}
