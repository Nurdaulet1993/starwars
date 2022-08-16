import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { IApiResponse } from '@core/models/api-response.model';
import { IFilm } from '@app/films/film.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsApiService {
  private readonly baseUrl = `${environment.api}/films`

  films$: Observable<IFilm[]> = this.http.get<IApiResponse<IFilm[]>>(this.baseUrl)
    .pipe(map(res => res.results));

  constructor(
    private http: HttpClient
  ) {}

  getFilms(search?: string): Observable<IFilm[]> {
    return this.http.get<IApiResponse<IFilm[]>>(this.baseUrl, {
      params: search ? { search } : {}
    })
      .pipe(map(res => res.results));
  }

  getFilm(id: number): Observable<IFilm> {
    return this.http.get<IFilm>(`${this.baseUrl}/${id}`);
  }
}
