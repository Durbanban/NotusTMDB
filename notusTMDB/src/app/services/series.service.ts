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
import { VideosSeriesResponse } from '../interfaces/videosSeries.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  getSeries(): Observable<SeriesResponse>{

    return this.http.get<SeriesResponse>(`${environment.API_BASE_URL}/tv/popular?api_key=${environment.API_KEY}`);
  }

  getSeriesDetails(id: string): Observable<SeriesResponse>{

    return this.http.get<SeriesResponse>(`${environment.API_BASE_URL}/tv/${id}?api_key=${environment.API_KEY}`)

  }

  getSeriesDetails2(id: string): Observable<Series>{

    return this.http.get<Series>(`${environment.API_BASE_URL}/tv/${id}?api_key=${environment.API_KEY}`)

  }

  getVideos(id: string):Observable<VideosSeriesResponse>{

    return this.http.get<VideosSeriesResponse>(`${environment.API_BASE_URL}tv/${id}/videos?api_key=${environment.API_KEY}`)
  }

  getDeleteRateSeries(id : number, session_id : string):Observable <DeleteRateResponse> {
    
    return this.http.delete<DeleteRateResponse>(`${environment.API_BASE_URL}/tv/${id}/rating?api_key=${environment.API_KEY}&session_id=${session_id}`)
  }

  getRateSeries2(createRate : CreateRateDto, id : number, session_id : string): Observable<SeriesRatedResponse>{
   
    return this.http.post<SeriesRatedResponse>(`${environment.API_BASE_URL}/tv/${id}/rating?api_key=${environment.API_KEY}&session_id=${session_id}`, createRate)
  }
  
}
