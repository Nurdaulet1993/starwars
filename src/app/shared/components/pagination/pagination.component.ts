import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { skip, takeWhile } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [PaginationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnDestroy {
  componentActive = true;
  pagesRanged$ = this.paginationService.pagesRange$;
  pages$ = this.paginationService.pages$;
  lastPage$ = this.paginationService.lastPage$;
  firstPage$ = this.paginationService.firstPage$;
  private _totalElements = 0;

  @Output() select = new EventEmitter<number>();

  @Input() set totalElements(totalElements: number) {
    this.paginationService.setTotalElements(totalElements);
    this._totalElements = totalElements;
  }

  @Input() set pageSize(pageSize: number) {
    this.paginationService.setPageSize(pageSize);
  }

  @Input() set currentPage(value: number) {
    this.paginationService.setCurrentPage(value);
  }

  constructor(
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    // this.paginationService.currentPageAction$
    //   .pipe(
    //     skip(1),
    //     takeWhile(() => this.componentActive)
    //   )
    //   .subscribe(value => {
    //     console.log(value);
    //     this.select.emit(value);
    //   })
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  get totalElements() {
    return this._totalElements;
  }

  onSelect(page: number) {
    this.select.emit(page);
  }
}
