import { Directive, Input } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from "@angular/forms";

// 禁止输入验证器
export function forbiddenTextValidator(textRe: RegExp, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = textRe.test(control.value);
    return forbidden ? { forbiddenText: { value: control.value, message } } : null;
  };
}

// 禁止输入指令
@Directive({
  selector: '[appForbiddenText]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenText') forbiddenText = '';
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenText ? forbiddenTextValidator(new RegExp(this.forbiddenText, 'i'))(control)
      : null;
  }
}