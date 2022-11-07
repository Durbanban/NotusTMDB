import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VideosResponse } from '../interfaces/videos.interface';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getAllVideos(id: number):Observable<VideosResponse>{
    return this.http.get<VideosResponse>(`${environment.API_BASE_URL}/movie/${id}/videos?api_key=${environment.API_KEY}`)
  }
}
