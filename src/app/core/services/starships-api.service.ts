import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { IApiResponse } from '@core/models/api-response.model';
import { IStarship } from '@app/starships/starship.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarshipsApiService {
  private readonly baseUrl = `${environment.api}/starships`;

  constructor(
    private http: HttpClient
  ) {}

  // Search by name and model fields
  getStarships(page?: number, search?: string) {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (search) params = params.set('search', search);

    return this.http.get<IApiResponse<IStarship[]>>(this.baseUrl, { params });
  }

  getStarship(id: number): Observable<IStarship> {
    return this.http.get<IStarship>(`${this.baseUrl}/${id}`);
  }
}
