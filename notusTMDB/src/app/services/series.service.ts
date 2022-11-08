import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRateDto } from '../dto/create-rate.dto';
import { DeleteRateResponse } from '../interfaces/deleteRate.interface';
import { SeriesDetailsResponse } from '../interfaces/series-details.interfaces';
import { Series, SeriesResponse } from '../interfaces/series.interaces';
import { RatedSeriesResponse } from '../interfaces/seriesRated.interfaces';
import { SeriesRatedResponse } from '../interfaces/seriesRated2.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  getSeries(): Observable<SeriesResponse>{

    return this.http.get<SeriesResponse>(`${environment.API_BASE_URL}/tv/popular?api_key=${environment.API_KEY}`);
  }

  getSeriesDetails(series: Series): Observable<SeriesDetailsResponse>{

    let id = series.id;

    return this.http.get<SeriesDetailsResponse>(`${environment.API_BASE_URL}/tv/${id}?api_key=${environment.API_KEY}`)

  }

  getRatedSeries(id: number, session_id: string): Observable<RatedSeriesResponse>{

    return this.http.get<RatedSeriesResponse>(`/account/${id}/rated/tv/episodes?api_key=${environment.API_KEY}&session_id=${session_id}`)
  }
  
  getDeleteRateSeries(id : number, session_id : string):Observable <DeleteRateResponse> {
    
    return this.http.delete<DeleteRateResponse>(`${environment.API_BASE_URL}/tv/${id}/rating?api_key=${environment.API_KEY}&session_id=${session_id}`)
  }

  getRateSeries2(createRate : CreateRateDto, id : number, session_id : string): Observable<SeriesRatedResponse>{
   
    return this.http.post<SeriesRatedResponse>(`${environment.API_BASE_URL}/tv/${id}/rating?api_key=${environment.API_KEY}&session_id=${session_id}`, createRate)
  }
  
}
