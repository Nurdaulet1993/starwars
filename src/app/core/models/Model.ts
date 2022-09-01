import { IProperties } from '@core/models/properties.model';

export class Model<T> {
  get: <K extends keyof T>(key: K) => T[K] = this.properties.get;
  set: (value: T, cb?: (value: T) => T) => void = this.properties.set;

  constructor(
    private properties: IProperties<T>
  ) {}
}
