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
    private viewContainer: ViewContainerRef) { }

  // 输入条件 appNotIf
  @Input() set appNotIf(condition: boolean) {
    // condition 为 false showFlag 为 true 
    if (!condition && !this.showFlag) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.showFlag = true;
    } else if (condition && this.showFlag) {
      this.viewContainer.clear();
      this.showFlag = false;
    }
  }

}
