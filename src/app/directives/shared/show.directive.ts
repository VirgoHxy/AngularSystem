import { Directive, ElementRef, Input } from '@angular/core';

// show 指令 控制display
@Directive({
  selector: '[appShow]'
})
export class ShowDirective {
  el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  // 输入条件 appShow
  @Input() set appShow(condition: boolean) {
    // true 为 block
    if (condition) {
      this.el.nativeElement.style.display = 'block';
    } else {
      this.el.nativeElement.style.display = 'none';
    }
  }

}
