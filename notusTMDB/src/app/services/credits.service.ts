import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CombinedCreditsResponse } from '../interfaces/combined-credits.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor(private http: HttpClient) { }

  public getActorFilmography(id: number): Observable<CombinedCreditsResponse> {
    return this.http.get<CombinedCreditsResponse>(`${environment.API_BASE_URL}/person/${id}/combined_credits?api_key=${environment.API_KEY}&language=es`)
  }
}
