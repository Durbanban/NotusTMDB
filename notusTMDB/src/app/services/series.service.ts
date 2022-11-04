import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Series, SeriesResponse } from '../interfaces/series.interaces';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  getSeries(id: number): Observable<SeriesResponse>{

    return this.http.get<SeriesResponse>(`${environment.apiBaseUrl}/tv/${id}`);
  }
}
