import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateSessionDto } from 'src/app/dto/create-session.dto';
import { DeleteSessionDto } from 'src/app/dto/delete-session.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  navbarOpen = false;
  session: CreateSessionDto;
  sessionDelete: DeleteSessionDto;
  sessionID: string | null = '';
  authToken = '';
  userName!: string;
  avatarPath!: string;
  sessionActive = false;

  constructor(private authService: AuthService,
    private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.sessionID = localStorage.getItem('session_id');
    if(this.sessionID != null) {
      this.sessionActive = true;
      this.authService.getUserDetails(this.sessionID).subscribe(respuesta => {
        this.userName = respuesta.username;
        this.avatarPath = `https://www.themoviedb.org/t/p/w32_and_h32_face/${respuesta.avatar.tmdb.avatar_path}`
      });
    }else {
      this.createSession();
    }
    
      
    
  }

  setNavbarOpen() {
    if(this.navbarOpen) {
      this.navbarOpen = false;
    }else {
      this.navbarOpen = true;
    }
  }

  requestToken() {
    this.authService.createRequestToken().subscribe(respuesta => {
      this.authToken = respuesta.request_token;
      window.location.href=`https://www.themoviedb.org/authenticate/${this.authToken}?redirect_to=http://localhost:4200/portada`
    });
  }

  isAuthenticated(): boolean {
    this.sessionID = localStorage.getItem('session_id');
    if(this.sessionID == null) {
      return false;
    }else if(this.sessionID != null){
      return true;
    }
  }

  createSession() {
    this.ruta.queryParams.subscribe(params => {
      if(params['approved'] == 'true') {
        this.session.request_token = params['request_token'];
        this.authService.createSession(this.session).subscribe(respuesta => {
          this.sessionID = respuesta.session_id;
          localStorage.setItem('session_id', this.sessionID);
          this.authService.getUserDetails(this.sessionID).subscribe(respuesta => {
            this.userName = respuesta.username;
            this.avatarPath = `https://www.themoviedb.org/t/p/w32_and_h32_face/${respuesta.avatar.tmdb.avatar_path}`
          });
        });
        this.sessionActive = true;
      }
    });
  }

  deleteSession(sessionID: string | null) {
    if(sessionID != null) {
      let sessionDelete = new DeleteSessionDto();
      sessionDelete.session_id = sessionID;
      this.authService.deleteSession(sessionDelete);
      localStorage.removeItem('session_id');
      this.sessionID = null;
      window.location.href="http://localhost:4200/portada"
    }
  }

}
