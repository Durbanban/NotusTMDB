import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditsResponse } from '../interfaces/credits.interface';
import { FilmResponse } from '../interfaces/films.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http : HttpClient) { }

  public getFilms(): Observable<FilmResponse>{
    return this.http.get<FilmResponse>(`${environment.API_BASE_URL}/movie/popular?api_key=${environment.API_KEY}`);
  }

  public getFilmCredits(id:number): Observable<CreditsResponse>{
    return this.http.get<CreditsResponse>(`${environment.API_BASE_URL}/movie/${id}/credits?api_key=${environment.API_KEY}`)
  }
}
