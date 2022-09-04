export interface IPageable {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface IPagination {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export class Pagination implements IPagination{
  static buildPagination() {
    return new Pagination({
      count: 0,
      next: null,
      previous: null
    })
  }

  public totalElements = 0;
  public totalPages = 0;
  public page = 1;
  public readonly size = 10;

  constructor(data: IPageable) {
    this.totalElements = data.count;
    this.totalPages = this.setTotalPages(data.count);
  }

  private setTotalPages(value: number) {
    return Math.ceil(value / this.size);
  }
}
