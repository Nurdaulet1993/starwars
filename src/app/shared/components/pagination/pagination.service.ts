import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, of, withLatestFrom} from 'rxjs';
import { IPage, IPaginationState } from '@shared/components/pagination/pagination.component';

@Injectable()
export class PaginationService {
  private readonly initialState: IPaginationState = {
    totalElements: 0,
    totalPages: 0,
    pageSize: 5,
    currentPage: 1
  }

  rangeStart = 0;
  rangeEnd = 5;

  private rangeSub = new BehaviorSubject<[number, number]>([0, 5]);
  rangeAction$ = this.rangeSub.pipe(
    map(([rangeStart, rangeEnd]) => ({ rangeStart, rangeEnd }))
  );

  private totalElementsSub = new BehaviorSubject<number>(this.initialState.totalElements);
  totalElements$ = this.totalElementsSub.asObservable();

  private pageSizeSub = new BehaviorSubject<number>(this.initialState.pageSize);
  pageSize$ = this.pageSizeSub.asObservable();

  private currentPageSub = new BehaviorSubject<number>(this.initialState.currentPage);
  currentPage$ = this.currentPageSub.asObservable();


  state$: Observable<IPaginationState> = combineLatest(this.totalElements$, this.pageSize$, this.currentPage$)
    .pipe(
      map(([totalElements, pageSize, currentPage]) => {
        return { totalElements, pageSize, currentPage, totalPages: Math.ceil(totalElements / pageSize) }
      })
    )

  pages$ = this.state$
    .pipe(
      map(({ totalPages, currentPage}) => this.setPages(totalPages, currentPage)),
    )

  rangedPages$ = combineLatest(this.pages$, this.rangeAction$)
    .pipe(
      map(([pages, { rangeStart, rangeEnd } ]) => {
        if (rangeEnd >= pages[pages.length - 1].label) {
          return pages.slice(rangeStart - rangeEnd);
        }

        return pages.slice(rangeStart, rangeEnd);
      })
    )


  setTotalElements(totalElements: number): void {
    this.totalElementsSub.next(totalElements);
  }

  setPageSize(pageSize: number): void {
    this.pageSizeSub.next(pageSize);
  }

  setCurrentPage(page: number): void {
    this.currentPageSub.next(page);
  }

  setPagesRange(rangeStart: number, rangeEnd: number): void {
    this.rangeSub.next([rangeStart, rangeEnd]);
  }



  private setPages(totalPages: number, currentPage: number): IPage[] {
    const pages: IPage[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push({ label: i, active: i === currentPage })
    }

    return pages;
  }
}
