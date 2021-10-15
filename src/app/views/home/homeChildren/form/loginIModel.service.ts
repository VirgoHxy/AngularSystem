import { Injectable } from '@angular/core';
import { FormModel } from '../../../../components/my-form//my-form-base'
import { MyFormItem, TextboxItem } from '../../../../components/my-form-item//my-form-item-base'
import { forbiddenTextValidator } from '../../../../directive/forbidden-text.directive'

@Injectable()
export class LoginItemService {

  // 获取表单模型
  getFormModel(): FormModel {
    return {
      element: {
        formItems: this.getFormItems(),
        title: "System Login",
        btns: [
          {
            name: "submit",
            text: "登录",
            style: "width: 100%"
          }
        ]
      },
      control: {
        name: "login",
        titleFlag: true
      },
      other: {}
    }
  }

  // 获取表单项
  private getFormItems() {
    const loginItems: MyFormItem<any>[] = [
      new TextboxItem({
        key: 'account',
        label: '账号',
        validators: {
          required: true,
          customValidators: [
            forbiddenTextValidator(/\@/i,"请勿输入@字符")
          ]
        }
      }),
      new TextboxItem({
        type: 'password',
        key: 'password',
        label: '密码',
        validators: {
          required: true,
          customValidators: [
            forbiddenTextValidator(/\@/i,"请勿输入@字符")
          ]
        }
      })
    ];

    return loginItems;
  }
}