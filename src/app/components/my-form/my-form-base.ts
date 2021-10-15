import { MyFormItem, Validators } from '../my-form-item/my-form-item-base'

/**
 * 表单模型
 * 
 * @param element 元素模型
 * @param control 控制模型
 * @param other 其他
 */
export interface FormModel {
  element: FormElementModel;
  control: FormControlModel;
  other?: FormOtherModel;
}

/**
 * 元素模型
 * 
 * @param formItems 表单项
 * @param title 标题
 * @param btns 按钮
 */
export interface FormElementModel {
  formItems: Array<MyFormItem<any>>;
  title?: string;
  btns?: Array<{
    name: string;
    text: string;
    [propName: string]: any;
  }>;
}

/**
 * 控制模型
 * 
 * @param name 表单名称
 * @param titleFlag 是否显示标题
 * @param validators 验证器
 */
export interface FormControlModel {
  name: string;
  titleFlag?: boolean;
  validators?: Validators;
}

/**
 * 其他
 * 
 */
export interface FormOtherModel {
  [propName: string]: any;
}