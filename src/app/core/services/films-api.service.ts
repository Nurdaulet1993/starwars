import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { IApiResponse } from '@core/models/api-response.model';
import { Film, IFilm } from '@app/films/film.model';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsApiService {
  private readonly baseUrl = `${environment.api}/films`

  films$: Observable<Film[]> = this.http.get<IApiResponse<IFilm[]>>(this.baseUrl)
    .pipe(
      shareReplay(1),
      map(res => res.results),
      map((films: IFilm[]) => films.map(film => new Film(film)))
    );

  constructor(
    private http: HttpClient
  ) {}

  getFilms(search?: string): Observable<Film[]> {
    return this.http.get<IApiResponse<IFilm[]>>(this.baseUrl, {
      params: search ? { search } : {}
    })
      .pipe(
        map(res => res.results),
        map((films: IFilm[]) => films.map(film => new Film(film)))
      );
  }

  getFilm(id: number): Observable<Film> {
    return this.http.get<IFilm>(`${this.baseUrl}/${id}`)
      .pipe(
        map((value: IFilm) => new Film(value))
      )
  }
}
