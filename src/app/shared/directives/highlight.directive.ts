import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostBinding('class.shadow-lg') shadow = false;
  @HostBinding('class.scale') scale = false;

  constructor(private el: ElementRef) { }

  @HostListener('mouseover') onHover() {
    this.shadow = true;
    this.scale = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.shadow = false;
    this.scale = false;
  }

}
