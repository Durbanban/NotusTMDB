import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Actor, ActorResponse } from '../interfaces/actor.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  public getPopularActors(page: number): Observable<ActorResponse> {
    return this.http.get<ActorResponse>(`${environment.API_BASE_URL}/person/popular?api_key=${environment.API_KEY}&language=es&page=${page}`);
  }

  public getAllActors(): Actor[] {
    let allActorsList: Actor[] = [];
    this.http.get<ActorResponse>(`${environment.API_BASE_URL}/person/popular?api_key=${environment.API_KEY}&language=es`).subscribe(respuesta => {
      for (let page = 1; page <= respuesta.total_pages; page++) {
        this.http.get<ActorResponse>(`${environment.API_BASE_URL}/person/popular?api_key=${environment.API_KEY}&language=es&page=${page}`).subscribe(respuesta => {
          respuesta.results.forEach(actor => {
            allActorsList.push(actor);
          });
        });
      }
    });
    return allActorsList;
  }

  

}
