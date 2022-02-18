import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyFormItem } from '../my-form-item/my-form-item-base';
import { MyFormItemService } from './my-form.service';
import { FormModel } from './my-form-base';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss'],
  providers: [MyFormItemService],
})
export class MyFormComponent implements OnInit {
  // 输入的 form 模型
  @Input() formModel!: FormModel;
  // 输出的 form 监听事件
  @Output() formEvent = new EventEmitter();
  // form 组
  form!: FormGroup;

  // 获取 form 的 element 元素模型
  get element() {
    return this.formModel.element;
  }

  // 获取 form 的 control 元素模型
  get control() {
    return this.formModel.control;
  }

  // 获取 form 的 other 其他模型
  get other() {
    return this.formModel.other;
  }

  constructor(private mfis: MyFormItemService) {}

  ngOnInit() {
    // 初始化
    this.form = this.mfis.toFormGroup(
      this.element.formItems as MyFormItem<any>[]
    );
    this.emit('formInit', this.form);
  }

  // 触发事件
  emit(type: string, data?: any) {
    this.formEvent.emit({
      name: this.control.name,
      type,
      data,
    });
  }

  // 按钮提交
  onSubmit() {
    this.emit('formBtn', 'submit');
  }

  // 按钮点击
  onButtonClick(name: string) {
    this.emit('formBtn', name);
  }

  // 关闭表单
  onCloseForm() {
    this.emit('closeForm');
  }
}
