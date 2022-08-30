import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  @HostBinding('class') classes = '';

  constructor(private el: ElementRef) { }

  @HostListener('mouseover') onHover() {
    this.classes = 'shadow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.classes = '';
  }

}
