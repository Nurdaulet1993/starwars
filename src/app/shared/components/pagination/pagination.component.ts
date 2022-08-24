import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { takeWhile } from 'rxjs';

export interface IPage {
  label: number;
  active: boolean;
}

export interface IPaginationState {
  totalElements: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [PaginationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnDestroy {
  componentActive = true;
  pages: IPage[] = [];
  currentPage = 1;
  rangeStart = 0;
  rangeEnd = 5;
  totalPages = 0;

  @Input('length') set total(totalElements: number) {
    this.paginationService.setTotalElements(totalElements);
  }

  @Input('pageSize') set size(pageSize: number) {
    this.paginationService.setPageSize(pageSize);
  }

  constructor(
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.paginationService.rangedPages$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(pages => this.pages = pages);

    this.paginationService.currentPage$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(currentPage => this.currentPage = currentPage)

    this.paginationService.rangeAction$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(({rangeStart, rangeEnd}) => {
        this.rangeStart = rangeStart;
        this.rangeEnd = rangeEnd;
      })

    this.paginationService.totalElements$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(totalElements => this.totalPages = Math.ceil(totalElements / 5))
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  onSelect(page: number): void {
    if (page > this.pages[this.pages.length - 1].label || page < 1) return;

    if (page === this.pages[this.pages.length - 2].label && this.pages[this.pages.length - 1].label !== this.totalPages) {
      this.paginationService.setPagesRange(++this.rangeStart, ++this.rangeEnd);
    }


    if (page === this.pages[this.pages.length - 1].label  && this.pages[this.pages.length - 1].label !== this.totalPages) {
      this.paginationService.setPagesRange(this.rangeStart + 2, this.rangeEnd + 2);
    }

    if (this.rangeStart >=1 && (page === this.pages[0].label || page === this.pages[1].label)) {
      this.paginationService.setPagesRange(--this.rangeStart, --this.rangeEnd);
    }

    this.paginationService.setCurrentPage(page);

  }
}
