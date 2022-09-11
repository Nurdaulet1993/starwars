import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IPage, PaginationService } from '@shared/components/pagination/pagination.service';

@Directive({
  selector: '[page]'
})
export class PageDirective {
  @Output() select = new EventEmitter<number>();
  private _page: IPage | null = null;

  @Input('page') set page(value: IPage | null) {
    if (!value) return;
    this._page = value;
    this.active = value.active;
  }
  @HostBinding('class.active') active = false;

  constructor(
    private paginationService: PaginationService
  ) {}

  @HostListener('click') onClick() {
    if (!this._page || this._page.active) return;
    this.select.emit(this._page.label);
  }



}
