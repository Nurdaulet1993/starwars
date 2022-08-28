import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, race, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCharacters, State} from '@app/characters/state';
import { getCharacters } from '@app/characters/state/actions/characters.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Character } from '@app/characters/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersResolver implements Resolve<Character[]> {
  constructor(
    private store: Store<State>,
    private router: Router,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Character[]> {
    this.store.dispatch(getCharacters());

    return this.store.select(selectCharacters);
  }
}
