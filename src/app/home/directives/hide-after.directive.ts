import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

class HideAfterContext {
  public get $implicit() {
    return this.hideAfter;
  }
  public hideAfter = 1000;
  public counter = 0;
}

@Directive({
  selector: '[hideAfter]'
})
export class HideAfterDirective implements OnInit {
  private _delay = 0;

  @Input('hideAfter') set delay(value: number | null) {
    this._delay = value ?? 0;
    this.context.hideAfter = this.context.counter = this._delay / 1000;
  }
  @Input('hideAfterThen') placeholder?: TemplateRef<any>;

  private context = new HideAfterContext();
  interval?: ReturnType<typeof setInterval>;

  constructor(
    private vcr: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.vcr.createEmbeddedView(this.template, this.context);

    this.interval = setInterval(() => {
      this.context.counter--
    }, 1000)

    setTimeout(this.remove, this.delay);
  }

  get delay(): number {
    return this._delay;
  }

  private remove = (): void => {
    this.vcr.clear();
    if (this.placeholder) {
      this.vcr.createEmbeddedView(this.placeholder, this.context)
    }

    if (this.interval) clearInterval(this.interval);
  }

}
