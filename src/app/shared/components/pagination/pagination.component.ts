import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

export interface IPage {
  label: number;
  active: boolean;
}

@Component({
  selector: 'app-pagination[totalPages]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  componentActive = true;
  private _pages: IPage[] = [];
  private _currentPage = 1;
  @Output() select = new EventEmitter<number>();

  @Input() set totalPages(value: number) {
    for (let i = 1; i <= value; i ++) {
      this._pages.push({
        label: i,
        active: i === this.currentPage
      })
    }
  }

  @Input() set page(value: number) {
    this._currentPage = value;

    this._pages = this._pages.map(item => {
      if (item.label === value) return { ...item, active: true };
      return { ...item, active: false };
    })
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  get pages(): IPage[] {
    return this._pages;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  onPage(value: number): void {
    if (value > this.pages.length || value < 1) return;
    this.select.emit(value);
  }
}
