import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { IApiResponse } from '@core/models/api-response.model';
import { ICharacter } from '@app/characters/character.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleApiService {
  baseUrl = `${environment.api}/people`;

  constructor(
    private http: HttpClient
  ) {}

  // Search by name
  getPeople(page?: number, search?: string): Observable<IApiResponse<ICharacter[]>> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (search) params = params.set('search', search);

    return this.http.get<IApiResponse<ICharacter[]>>(this.baseUrl, { params });
  }

  getCharacter(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${this.baseUrl}/${id}`);
  }
}
