import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { IApiResponse } from '@core/models/api-response.model';
import { ISpecie } from '@app/species/specie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeciesApiService {
  private readonly baseUrl = `${environment.api}/species`;

  constructor(
    private http: HttpClient
  ) {}

  // Search by name
  getSpecies(page?: number, search?: string): Observable<IApiResponse<ISpecie[]>> {
    let params =  new HttpParams();
    if (page) params = params.set('page', page);
    if (search) params = params.set('search', search);

    return this.http.get<IApiResponse<ISpecie[]>>(this.baseUrl, { params });
  }

  getSpecie(id: number): Observable<ISpecie> {
    return this.http.get<ISpecie>(`${this.baseUrl}/${id}`);
  }
}
