import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { IApiResponse } from '@core/models/api-response.model';
import { IPlanet } from '@app/planets/planet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsApiService {
  private readonly baseUrl = `${environment.api}/planets`;

  constructor(
    private http: HttpClient
  ) {}

  // Search by name of planet
  getPlanets(page: number, search?: string): Observable<IApiResponse<IPlanet[]>> {
    let params = new HttpParams().set('page', page);
    if (search) params = params.set('search', search);

    return this.http.get<IApiResponse<IPlanet[]>>(this.baseUrl, { params });
  }

  getPlanet(id: number): Observable<IPlanet> {
    return this.http.get<IPlanet>(`${this.baseUrl}/${id}`);
  }
}
