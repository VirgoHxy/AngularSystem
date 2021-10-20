import { Injectable } from '@angular/core';
import { FormModel } from '@components/my-form//my-form-base'
import { MyFormItem, TextboxItem } from '@components/my-form-item//my-form-item-base'
import { forbiddenTextValidator } from '@directives/forbidden-text.directive'

@Injectable()
export class FormService {

  // 获取表单模型
  getFormModel(): FormModel {
    return {
      element: {
        formItems: this.getFormItems(),
        title: '城市',
        btns: [
          {
            name: 'submit',
            text: '确认',
            style: 'width: 100%'
          }
        ]
      },
      control: {
        name: 'form',
        titleFlag: true
      },
      other: {}
    }
  }

  // 获取表单项
  private getFormItems() {
    const loginItems: MyFormItem<any>[] = [
      new TextboxItem({
        key: 'name',
        label: '名称',
        validators: {
          required: true,
          customValidators: [
            forbiddenTextValidator(/\@/i,'请勿输入@字符')
          ]
        }
      })
    ];

    return loginItems;
  }
}