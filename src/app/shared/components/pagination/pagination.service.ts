import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

interface DamageLogger {
  (reason: string): void;
}

export type DLogger = (reason: string) => void;

export interface Book {
  name: string;
  logger: DamageLogger;
}

const book: Book = {
  name: 'Helen',
  logger: (reason: string) => console.log(reason)
}

export interface IPage {
  label: number;
  active: boolean;
  isFirst: boolean;
  isLast: boolean;
}

@Injectable()
export class PaginationService {

  private totalElementsSub = new BehaviorSubject<number>(0);
  totalElementsAction$ = this.totalElementsSub.asObservable();

  private pageSizeSub = new BehaviorSubject<number>(10)
  pageSizeAction$ = this.pageSizeSub.asObservable();

  private currentPageSub = new BehaviorSubject<number>(1);
  currentPageAction$ = this.currentPageSub.asObservable();


  pages$ = combineLatest(this.totalElementsAction$, this.pageSizeAction$, this.currentPageAction$)
    .pipe(
      map(([elements, size, currentPage]) => ({ value: Math.ceil(elements / size), currentPage })),
      map(this.setPages)
    )

  lastPage$: Observable<IPage> = this.pages$
    .pipe(
      map(value => ({
        label: value.length,
        active: false,
        isFirst: false,
        isLast: true
      }))
    )

  firstPage$ = this.pages$.pipe(
    map(pages => pages.find(item => item.label === 1)),
    map(value => {
      if (value === undefined) return null;
      return value;
    })
  )

  pagesRange$ = combineLatest(this.pages$, this.currentPageAction$)
    .pipe(
      map(([pages, currentPage]) => {
        if (pages.length === 0) return;

        if (currentPage === pages[pages.length - 1].label) {
          return pages.slice(pages.length - 3);
        }

        if (currentPage > 4 && currentPage !== pages[pages.length - 1].label) {
          return pages.slice(currentPage - 2, currentPage + 1);
        }

        return pages.slice(0, 5);
      })
    )

  constructor() {}

  setTotalElements(value: number): void {
    this.totalElementsSub.next(value)
  }

  setPageSize(value: number): void {
    this.pageSizeSub.next(value)
  }

  setCurrentPage(value: number) {
    this.currentPageSub.next(value);
  }

  private setPages({ value, currentPage }: { value: number, currentPage: number }): IPage[] {
    let pages: IPage[] = [];

    for (let i = 1; i <= value; i++) {
      pages.push({
        label: i,
        active: i === currentPage,
        isFirst: i === 1,
        isLast: i === value
      })
    }

    return pages;
  }


}
