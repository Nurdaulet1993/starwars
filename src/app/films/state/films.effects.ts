import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { FilmsApiService } from '@core/services/films-api.service';
import { Store } from '@ngrx/store';
import { State } from '@app/films/state/index';
import { FilmsActions, FilmsApiActions  } from './actions';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { Film, IFilm } from '@app/films/film.model';

@Injectable()
export class FilmsEffects {

  loadFilms$ = createEffect(() => this.actions$.pipe(
    ofType(FilmsActions.getFilms),
    mergeMap(() => this.filmsApiService.getFilms()
        .pipe(
          map((films: IFilm[]) => films.map(film => new Film(film))),
          map((films) => FilmsApiActions.getFilmsSuccess({ films })),
          catchError(() => EMPTY)
        )
    )
  ))


  constructor(
    private actions$: Actions,
    private filmsApiService: FilmsApiService,
    private store: Store<State>
  ) {}
}
