import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { IPage, PaginationService } from '@shared/components/pagination/pagination.service';
import { takeWhile } from 'rxjs';

class PageLastContext {
  public get $implicit() {
    return this.page;
  }
  public page: IPage = {
    label: 0,
    active: false,
    isFirst: false,
    isLast: true
  }
}

@Directive({
  selector: '[pageLast]'
})
export class PageLastDirective implements OnDestroy {
  directiveActive = true;

  @Input('pageLast') set page(value: IPage | null) {
    if (!value) return;
    this.context.page = value;

    this.paginationService.currentPageAction$
      .pipe(takeWhile(() => this.directiveActive))
      .subscribe(currentPage => {
        this.vcr.clear();
        if (currentPage < this.context.page.label - 1) {
          this.vcr.createEmbeddedView(this.templateRef, this.context);
        }
      })
  }

  private context = new PageLastContext()

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.directiveActive = false;
  }

}
