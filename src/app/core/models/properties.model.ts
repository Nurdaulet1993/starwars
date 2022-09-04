export interface IProperties<T> {
  set(value: T, cb?: (value: T) => T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}


export class Properties<T> implements IProperties<T>{
  constructor(private data: T) {}

  // Do not forget about context
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }

  getAll(): T {
    return this.data;
  }

  set = <K extends T>(value: T, cb?: (value: T) => K): void  => {
    this.data = cb ? cb(value) : value;
  }
}
