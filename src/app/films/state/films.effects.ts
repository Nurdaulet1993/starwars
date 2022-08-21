import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { FilmsApiService } from '@core/services/films-api.service';
import { Store } from '@ngrx/store';
import { State } from '@app/films/state/index';
import { FilmsActions, FilmsApiActions  } from './actions';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';

@Injectable()
export class FilmsEffects {

  loadFilms$ = createEffect(() => this.actions$.pipe(
    ofType(FilmsActions.getFilms),
    mergeMap(() => this.filmsApiService.films$
        .pipe(
          map((films) => FilmsApiActions.getFilmsSuccess({ films })),
          catchError(() => EMPTY)
        )
    )
  ))

  getFilm$ = createEffect(() => this.actions$.pipe(
    ofType(FilmsActions.getFilm),
    mergeMap(({ id }) => this.filmsApiService.getFilm(id)
      .pipe(
        map((film) => FilmsApiActions.getFilmSuccess({ film })),
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
