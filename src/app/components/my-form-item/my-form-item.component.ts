import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyFormItem } from './my-form-item-base';

@Component({
  selector: 'app-my-form-item',
  templateUrl: './my-form-item.component.html',
  styleUrls: ['./my-form-item.component.scss']
})
export class MyFormItemComponent implements OnInit {
  // 项
  @Input() formItem!: MyFormItem<any>;
  // 表单组
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
