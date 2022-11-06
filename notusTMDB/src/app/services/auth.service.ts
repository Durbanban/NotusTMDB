import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestTokenResponse } from '../interfaces/request-token.interface';
import { CreateSessionDto } from '../dto/create-session.dto';
import { CreateSessionResponse } from '../interfaces/create-session.interface';
import { AccountDetailsResponse } from '../interfaces/account-details.interface';
import { DeleteSessionDto } from '../dto/delete-session.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createRequestToken(): Observable<RequestTokenResponse> {
    return this.http.get<RequestTokenResponse>(`${environment.API_BASE_URL}/authentication/token/new?api_key=${environment.API_KEY}`);
  }

  createSession(token: CreateSessionDto): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(`${environment.API_BASE_URL}/authentication/session/new?api_key=${environment.API_KEY}`, token);
  }

  getUserDetails(session: string | null): Observable<AccountDetailsResponse> {
    return this.http.get<AccountDetailsResponse>(`${environment.API_BASE_URL}/account?session_id=${session}&api_key=${environment.API_KEY}`);
  }

  deleteSession(session: DeleteSessionDto) {
    this.http.request('delete', `${environment.API_BASE_URL}/authentication/session?api_key=${environment.API_KEY}`, {body: session});
  }

}
