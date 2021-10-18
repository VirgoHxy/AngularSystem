import { Directive, Inject, ElementRef, HostListener, Input } from '@angular/core';
import { APP_CSS, AppCss }  from '../app.config';

// 高亮指令
@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {
  // 样式对象
  css: AppCss;
  // 当前元素
  el: ElementRef;
  // 输入背景颜色
  @Input() bgColor = '';
  // 输入字体颜色
  @Input() fontColor = '';

  constructor(@Inject(APP_CSS) css: AppCss, el: ElementRef) {
    this.el = el;
    this.css = css;
  }

  // 监听绑定元素移入
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(`background-color: ${this.bgColor || this.css.primaryColor};color: ${this.fontColor || '#444'};`);
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
