import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditsResponse } from '../interfaces/credits.interface';
import { FilmDetailsResponse } from '../interfaces/filmDetails.interface';
import { FilmResponse } from '../interfaces/films.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http : HttpClient) { }

  public getFilms(n : number): Observable<FilmResponse>{
    return this.http.get<FilmResponse>(`${environment.API_BASE_URL}/movie/popular?api_key=${environment.API_KEY}&page=${n}`);
  }

  public getFilmById(id:number): Observable<FilmDetailsResponse>{
    return this.http.get<FilmDetailsResponse>(`${environment.API_BASE_URL}/movie/${id}?api_key=${environment.API_KEY}`)
  }
}
