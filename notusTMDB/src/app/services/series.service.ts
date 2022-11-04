import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SeriesResponse } from '../interfaces/series.interaces';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  getSeries(): Observable<SeriesResponse>{

    return this.http.get<SeriesResponse>(`${environment.API_BASE_URL}/tv/popular?api_key=${environment.API_KEY}`);
  }

  
}
