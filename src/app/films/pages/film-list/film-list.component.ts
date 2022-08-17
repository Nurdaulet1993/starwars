import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilms, State } from '@app/films/state';
import { getFilms } from '@app/films/state/actions/films.actions';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  films$ = this.store.select(selectFilms);

  constructor(
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getFilms());
  }

}
