import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCharacters, selectLoading, selectPagination, State } from '@app/characters/state';
import { getCharacters, setDefault, setPage, setSearch} from '@app/characters/state/actions/characters.actions';
import { BehaviorSubject, takeWhile } from 'rxjs';
import { Character } from '@app/characters/character.model';
import { ActivatedRoute } from '@angular/router';
import { CharactersFilterService } from '@app/characters/services/characters-filter.service';
import { CharactersService } from '@app/characters/services/characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListComponent implements OnInit, OnDestroy {
  componentActive = true;
  characters$ = new BehaviorSubject<Character[]>([]);
  pagination$ = this.store.select(selectPagination);
  loading$ = this.store.select(selectLoading);
  layoutType$ = this.charactersService.layoutAction$;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private charactersFilterService: CharactersFilterService,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getCharacters())
    this.getCharacters();
    this.charactersService.setLayout('grid');

    this.charactersFilterService.searchAction$
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe(this.onSearch)
  }

  ngOnDestroy(): void {
    this.componentActive = false;
    this.store.dispatch(setDefault());
  }

  getCharacters(): void {
    this.store.select(selectCharacters)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(this.characters$)
  }

  onPage(page: number): void {
    this.store.dispatch(setPage({ page }));
  }

  onSearch = (search: string): void => {
    this.store.dispatch(setSearch({ search }));
  }
}
