import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilms, State } from '@app/films/state';
import { getFilms } from '@app/films/state/actions/films.actions';
import { FormControl } from '@angular/forms';
import {debounceTime, takeWhile} from 'rxjs';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit, OnDestroy {
  componentActive = true;
  films$ = this.store.select(selectFilms);
  filterValue = '';
  filter = new FormControl('');

  constructor(
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getFilms());

    this.filter.valueChanges
      .pipe(
        takeWhile(() => this.componentActive),
        debounceTime(1000)
      )
      .subscribe(value => {
        if (value !== null) this.filterValue = value;
      })
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
