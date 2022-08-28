import {Directive, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import { IPage, PaginationService } from '@shared/components/pagination/pagination.service';
import { takeWhile } from 'rxjs';

class PageFirstContext {
  get $implicit(): IPage {
    return this.page;
  }

  page: IPage = {
    label: 1,
    active: false,
    isFirst: true,
    isLast: false
  }
}

@Directive({
  selector: '[pageFirst]'
})
export class PageFirstDirective implements OnInit {
  componentActive = true;

  @Input('pageFirst') set pages(value: IPage | null) {
    if (!value) return;
    this.context.page = value;
  }

  private context = new PageFirstContext();

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private paginationService: PaginationService,
  ) {}

  ngOnInit(): void {
    this.paginationService.currentPageAction$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(value => {
        this.vcr.clear();

        if (value > 4) {
          this.vcr.createEmbeddedView(this.templateRef, this.context);
        } else {
          this.vcr.clear();
        }
      })
  }

}
