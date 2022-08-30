import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CharactersFilterService {
  searchSub = new Subject<string>();
  searchAction$ = this.searchSub.asObservable();

  search(value: string): void {
    this.searchSub.next(value);
  }
}
