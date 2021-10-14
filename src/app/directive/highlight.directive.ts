import { Directive, Inject, ElementRef, HostListener, Input } from '@angular/core';
import { APP_CSS, AppCss }  from '../app.config';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {
  
  css: AppCss;

  el: ElementRef;

  @Input() bgColor = '';

  @Input() fontColor = '';

  constructor(@Inject(APP_CSS) css: AppCss, el: ElementRef) {
    this.el = el;
    this.css = css;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(`background-color: ${this.bgColor || this.css.primaryColor};color: ${this.fontColor || "#444"};`);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(cssText: string) {
    this.el.nativeElement.style.cssText = cssText;
  }

}
