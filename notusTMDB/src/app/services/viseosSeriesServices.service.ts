import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideosResponse } from '../interfaces/videos.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ViseosServicesSeriesService {

  constructor(private http: HttpClient) { }

  getVideos(id: number):Observable<VideosResponse>{

    return this.http.get<VideosResponse>(`${environment.API_BASE_URL}tv/${id}/videos?api_key=${environment.API_KEY}`)
  }
}
