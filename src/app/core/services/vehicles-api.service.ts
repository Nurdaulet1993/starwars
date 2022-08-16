import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { IApiResponse } from '@core/models/api-response.model';
import { IVehicle } from '@app/vehicles/vehicle.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesApiService {
  private readonly baseUrl = `${environment.api}/vehicles`;

  constructor(
    private http: HttpClient
  ) {}

  // Search by name or model fields
  getVehicles(page?: number, search?: string): Observable<IApiResponse<IVehicle[]>> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (search) params = params.set('search', search);
    return this.http.get<IApiResponse<IVehicle[]>>(this.baseUrl, { params})
  }

  getVehicle(id: number): Observable<IVehicle> {
    return this.http.get<IVehicle>(`${this.baseUrl}/${id}`);
  }


}
