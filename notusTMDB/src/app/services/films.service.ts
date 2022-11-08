import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateFavDto } from '../dto/create-fav-dto';
import { CreateRateDto } from '../dto/create-rate.dto';
import { DeleteRateResponse } from '../interfaces/deleteRate.interface';
import { FilmDetailsResponse } from '../interfaces/filmDetails.interface';
import { FilmRatedResponse } from '../interfaces/filmRated.interface';
import { MarkFavoriteResponse } from '../interfaces/mark-favorite.interface';
import { FilmResponse, Film } from '../interfaces/ratedFilmsList.interface';

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

  public getAllFilms(): Film[] {
    let listadoAllFilm: Film[] = []

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

  public getRatedFilms(id : number, session_id : string): Observable <FilmResponse>{
    return this.http.get<FilmResponse>(`${environment.API_BASE_URL}/account/${id}/rated/movies?api_key=${environment.API_KEY}&session_id=${session_id}`)
  }

  public deleteRateFilm(id : number, session_id : string):Observable <DeleteRateResponse> {
    return this.http.delete<DeleteRateResponse>(`${environment.API_BASE_URL}/movie/${id}/rating?api_key=${environment.API_KEY}&session_id=${session_id}`)
  }

  public getFavoriteFilms(session_id: string, account_id: string): Observable<FilmResponse> {
    return this.http.get<FilmResponse>(`${environment.API_BASE_URL}/account/${account_id}/favorite/movies?api_key=${environment.API_KEY}&session_id=${session_id}&language=es`);
  }

  public markFavFilm(account_id: number, session_id:string, dto: CreateFavDto): Observable<MarkFavoriteResponse> {
    return this.http.post<MarkFavoriteResponse>(`${environment.API_BASE_URL}/account/${account_id}/favorite?session_id=${session_id}&api_key=${environment.API_KEY}`, dto);
  }
}