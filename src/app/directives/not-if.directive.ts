import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// notIf 指令 与 if 相反
@Directive({
  selector: '[appNotIf]'
})
export class NotIfDirective {
  // 元素是否展示
  private showFlag = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) { }

  // 输入条件 appNotIf
  @Input() set appNotIf(condition: boolean) {
    // condition 为 false showFlag 为 true 
    if (!condition && !this.showFlag) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.showFlag = true;
    } else if (condition && this.showFlag) {
      this.viewContainerRef.clear();
      this.showFlag = false;
    }
  }

}
