import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LayoutType = 'list' | 'grid';

@Injectable()
export class CharactersService {
  private layoutSub = new BehaviorSubject<LayoutType>('grid');
  layoutAction$ = this.layoutSub.asObservable();

  setLayout(value: LayoutType): void {
    this.layoutSub.next(value);
  }
}
