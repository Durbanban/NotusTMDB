import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorResponse } from '../interfaces/actor.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  public getPopularActors(page: number): Observable<ActorResponse> {
    return this.http.get<ActorResponse>(`${environment.API_BASE_URL}/person/popular?api_key=${environment.API_KEY}&language=es&page=${page}`);
  }

}
