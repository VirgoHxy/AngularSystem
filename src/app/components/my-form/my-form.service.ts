import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyFormItem } from '../my-form-item/my-form-item-base';

@Injectable()
export class MyFormItemService {

  toFormGroup(formItems: MyFormItem<any>[]) {
    const group: any = {};

    // 遍历items
    formItems.forEach(formItem => {
      let validators = [];
      // 是否必填验证
      if (formItem?.validators?.required) {
        validators.push(Validators.required);
      }
      // push 自定义验证
      if (formItem?.validators?.customValidators) {
        validators.push(...formItem.validators.customValidators);
      }
      group[formItem.key] = new FormControl(formItem.value || '', validators);
    });
    return new FormGroup(group);
  }

}