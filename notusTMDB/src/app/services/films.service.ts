import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRateDto } from '../dto/create-rate.dto';
import { DeleteRateResponse } from '../interfaces/deleteRate.interface';
import { FilmDetailsResponse } from '../interfaces/filmDetails.interface';
import { FilmRatedResponse } from '../interfaces/filmRated.interface';
import { FilmResponse, Films } from '../interfaces/films.interface';
import { RatedFilmsResponse } from '../interfaces/ratedFilmsList.interface';

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

  public rateFilm(createRate : CreateRateDto, id : number, session_id : string): Observable<FilmRatedResponse>{
    return this.http.post<FilmRatedResponse>(`${environment.API_BASE_URL}/movie/${id}/rating?api_key=${environment.API_KEY}&session_id=${session_id}`, createRate)
  }

  public getRatedFilms(id : number, session_id : string): Observable <RatedFilmsResponse>{
    return this.http.get<RatedFilmsResponse>(`${environment.API_BASE_URL}/account/${id}/rated/movies?api_key=${environment.API_KEY}&session_id=${session_id}`)
  }

  public deleteRateFilm(id : number, session_id : string):Observable <DeleteRateResponse> {
    return this.http.delete<DeleteRateResponse>(`${environment.API_BASE_URL}/movie/${id}/rating?api_key=${environment.API_KEY}&session_id=${session_id}`)
  }
}