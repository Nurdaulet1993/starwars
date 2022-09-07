export class Collection<T, K> {
  private models: T[] = [];

  constructor(
    public deserialize: (value: K) => T,
    public sort?: (value: T[]) => T[]
  ) {}

  fetch(data: K[]): void {
    this.models = data.map(item => this.deserialize(item));
  }

  data(value: { sort: boolean } ): T[] {
    if (value.sort && this.sort) return this.sort(this.models);
    return this.models;
  }
}
