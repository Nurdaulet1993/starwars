import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { IApiResponse } from '@core/models/api-response.model';
import { Character, ICharacter } from '@app/characters/character.model';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleApiService {
  baseUrl = `${environment.api}/people`;

  constructor(
    private http: HttpClient
  ) {}

  // Search by name
  getPeople(page?: number, search?: string): Observable<IApiResponse<Character[]>> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (search) params = params.set('search', search);

    return this.http.get<IApiResponse<ICharacter[]>>(this.baseUrl, { params })
      .pipe(
        map(value => {
          return {
            ...value,
            results: value.results.map(item => Character.buildCharacter(item))
          }
        }),
      );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<ICharacter>(`${this.baseUrl}/${id}`)
      .pipe(
        map(value => Character.buildCharacter(value))
      )
  }

  search(search: string): Observable<Character[]> {
    return this.http.get<IApiResponse<ICharacter[]>>(this.baseUrl, {
      params: { search }
    })
      .pipe(
        map(value => {
          return value.results.map(item => Character.buildCharacter(item))
        }),
      );
  }
}
