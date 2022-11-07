import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorDetailsResponse } from '../interfaces/actor-details.interface';
import { CombinedCreditsResponse, Filmography } from '../interfaces/combined-credits.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorDetailsService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<ActorDetailsResponse> {
    return this.http.get<ActorDetailsResponse>(`${environment.API_BASE_URL}/person/${id}?api_key=${environment.API_KEY}&language=es`);
  }

  
}
