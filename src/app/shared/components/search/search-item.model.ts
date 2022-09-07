import { Collection } from '@core/models/Collection';

export interface ISearchItem {
  id: number,
  name: string,
  type: string;
}

export class SearchItem {

  constructor(public data: ISearchItem) {}

  static buildCollection() {
    return new Collection<SearchItem, ISearchItem>(
      (value: ISearchItem) => new SearchItem(value),
      (value: SearchItem[]) => value.sort((a, b) => a.data.name.localeCompare(b.data.name) )
    )
  }


}
