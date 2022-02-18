import { Directive, Inject, ElementRef, HostListener, Input } from '@angular/core';

// 高亮指令
@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {
  // 当前元素
  el: ElementRef;
  // 输入背景颜色
  @Input() bgColor = '';
  // 输入字体颜色
  @Input() fontColor = '';

  constructor( el: ElementRef) {
    this.el = el;
  }

  // 监听绑定元素移入
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(`background-color: ${this.bgColor || 'var(--primary)'};color: ${this.fontColor || '#444'};`);
  }
  
  // 监听绑定元素移出
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  // 改变样式
  private highlight(cssText: string) {
    this.el.nativeElement.style.cssText = cssText;
  }

}
