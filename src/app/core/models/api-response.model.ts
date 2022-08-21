export interface IApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export interface IError {
  detail: string
}
