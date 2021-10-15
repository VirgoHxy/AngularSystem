/**
 * 验证器模型
 * 
 * @param required 内置验证器-是否必填
 * @param maxLength 内置验证器-最大长度
 * @param minLength 内置验证器-最小长度
 * @param pattern 内置验证器-正则
 * @param customValidators 自定义验证器数组
 */
export interface Validators {
  required?: boolean;
  maxLength?: number | boolean;
  minLength?: number | boolean;
  pattern?: string | boolean;
  customValidators?: Array<any>;
}

/**
 * 表单项基础类
 * 
 * @param value 初始值
 * @param key 项唯一标志
 * @param label 项标签
 * @param validators 项验证器
 * @param controlType 项类型
 * @param type 项子类型
 * @param options 下拉列表
 */
export class MyFormItem<T> {
  value: T|undefined;
  key: string;
  label: string;
  validators: Validators|undefined;
  controlType: string;
  type: string;
  options: {key: string, value: string}[];

  constructor(options: {
      value?: T;
      key?: string;
      label?: string;
      validators?: Validators;
      controlType?: string;
      type?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.validators = options.validators;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}

/**
 * 下拉表单项继承类
 * 
 */
export class DropdownItem extends MyFormItem<string> {
  controlType = 'dropdown';
}

/**
 * textbox继承类
 * 
 */
export class TextboxItem extends MyFormItem<string> {
  controlType = 'textbox';
}