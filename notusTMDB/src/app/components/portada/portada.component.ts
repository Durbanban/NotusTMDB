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

  constructor(private authService: AuthService,
    private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.isAuthenticated) {
      this.createSession();
      this.authService.getUserDetails(this.sessionID).subscribe(respuesta => {
        this.userName = respuesta.username;
        this.avatarPath = `https://www.themoviedb.org/t/p/w32_and_h32_face/${respuesta.avatar.tmdb.avatar_path}`;
      });
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
      if(respuesta.success) {
        this.authToken = respuesta.request_token;
        window.location.href=`https://www.themoviedb.org/authenticate/${this.authToken}?redirect_to=http://localhost:4200/portada`
      }
    });
  }

  isAuthenticated(): boolean {
    this.sessionID = localStorage.getItem('session_id');
    if(this.sessionID == null) {
      return false;
    }else {
      return true;
    }
  }

  createSession() {
    this.ruta.queryParams.subscribe(params => {
      if(params['approved'] == 'true') {
        this.session.request_token = params['request_token'];
        this.authService.createSession(this.session).subscribe(respuesta => {
          localStorage.setItem('session_id', respuesta.session_id);
        });
      }
    });
  }

}
