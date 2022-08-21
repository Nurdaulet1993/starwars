import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PeopleApiService } from '@core/services/people-api.service';
import { CharactersActions, CharactersApiActions } from './actions';
import { catchError, EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPagination, selectSearch, State } from '@app/characters/state/index';

@Injectable()
export class CharactersEffects {
  getCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(
      CharactersActions.getCharacters,
      CharactersActions.setPage
    ),
    withLatestFrom(
      this.store.select(selectPagination),
      this.store.select(selectSearch)
    ),
    mergeMap(([,pagination, search]) => this.peopleApiService.getPeople(pagination.page, search).pipe(
      map(value => CharactersApiActions.getCharactersSuccess({ payload: value, page: pagination.page })),
      catchError(error => EMPTY)
    ))
  ))


  constructor(
    private actions$: Actions,
    private peopleApiService: PeopleApiService,
    private store: Store<State>
  ) {}
}
