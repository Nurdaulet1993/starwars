import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Character } from '@app/characters/character.model';
import { PeopleApiService } from '@core/services/people-api.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterResolver implements Resolve<Character> {
  constructor(
    private peopleApiService: PeopleApiService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Character> {
    return this.peopleApiService.getCharacter(route.params['id'])
      .pipe(
        catchError(() => {
          this.router.navigate(['characters']);
          return EMPTY;
        })
      )
  }
}
