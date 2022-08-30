import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/characters/state';
import { getCharacters } from '@app/characters/state/actions/characters.actions';
import { Actions, ofType } from '@ngrx/effects';
import { CharactersApiActions } from '@app/characters/state/actions';

@Injectable({
  providedIn: 'root'
})
export class CharactersResolver implements Resolve<boolean> {
  constructor(
    private store: Store<State>,
    private router: Router,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(getCharacters());

    return this.actions$.pipe(ofType(CharactersApiActions.getCharactersSuccess))
  }
}
