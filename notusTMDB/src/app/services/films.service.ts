import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilmDetailsResponse } from '../interfaces/filmDetails.interface';
import { FilmResponse, Films } from '../interfaces/films.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  public getFilms(n: number): Observable<FilmResponse> {
    return this.http.get<FilmResponse>(`${environment.API_BASE_URL}/movie/popular?api_key=${environment.API_KEY}&page=${n}`);
  }

  public getFilmById(id: number): Observable<FilmDetailsResponse> {
    return this.http.get<FilmDetailsResponse>(`${environment.API_BASE_URL}/movie/${id}?api_key=${environment.API_KEY}`);
  }

  public getAllFilms(): Films[] {
    let listadoAllFilm: Films[] = []

    this.http.get<FilmResponse>(`${environment.API_BASE_URL}/movie/popular?api_key=${environment.API_KEY}`).subscribe(a => {
      for (let i = 1; i < 500; i++) {
        this.http.get<FilmResponse>(`${environment.API_BASE_URL}/movie/popular?api_key=${environment.API_KEY}&page=${i}`).subscribe(b => {
          b.results.forEach(c => {
            listadoAllFilm.push(c)
          })
        })
      }
    })
    
    return listadoAllFilm;
  }
}
