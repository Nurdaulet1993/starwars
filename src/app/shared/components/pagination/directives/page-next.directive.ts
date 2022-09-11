import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { IPage, PaginationService } from '@shared/components/pagination/pagination.service';
import { takeWhile } from 'rxjs';

@Directive({
  selector: '[pageNext]'
})
export class PageNextDirective implements OnInit, OnDestroy {
  @HostBinding('class.disabled') disabled = false;
  @Output() select = new EventEmitter<number>();
  directiveActive = true;
  currentPage = 1;
  pages: IPage[] = [];

  constructor(
    private el: ElementRef,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.paginationService.currentPageAction$
      .pipe(takeWhile(() => this.directiveActive))
      .subscribe(value => this.currentPage = value);

    this.paginationService.pages$
      .pipe(takeWhile(() => this.directiveActive))
      .subscribe(value => {
        this.pages = value;
        this.disabled = this.currentPage === this.pages.length;
      });

    this.paginationService.totalElementsAction$
      .subscribe(value => console.log(value))
  }

  ngOnDestroy(): void {
    this.directiveActive = false;
  }

  @HostListener('click') onClick() {
    const page = this.currentPage + 1;
    if (page > this.pages.length) return;
    this.select.emit(page);
  }



}
