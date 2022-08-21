import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCharacters, selectPagination, State } from '@app/characters/state';
import {getCharacters, setPage} from '@app/characters/state/actions/characters.actions';
import { BehaviorSubject, takeWhile } from 'rxjs';
import { Character } from '@app/characters/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  componentActive = true;
  characters$ = new BehaviorSubject<Character[]>([]);
  pagination$ = this.store.select(selectPagination);

  constructor(
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getCharacters());
    this.getCharacters();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  getCharacters(): void {
    this.store.select(selectCharacters)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(this.characters$)
  }

  onPage(page: number): void {
    this.store.dispatch(setPage({ page }));
  }
}
