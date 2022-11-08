import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSessionDto } from 'src/app/dto/create-session.dto';
import { DeleteSessionDto } from 'src/app/dto/delete-session.dto';
import { FilmDetailsResponse } from 'src/app/interfaces/filmDetails.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FilmsService } from 'src/app/services/films.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  navbarOpen = false;
  session: CreateSessionDto = {} as CreateSessionDto;
  sessionDelete: DeleteSessionDto = {} as DeleteSessionDto;
  sessionID: string | null = '';
  authToken = '';
  userName!: string;
  avatarPath!: string;
  sessionActive = false;
  filmId : string;
  accountID: string = '';

  constructor(private authService: AuthService,
    private ruta: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sessionID = localStorage.getItem('session_id');
    if(this.sessionID != null) {
      this.sessionActive = true;
      this.authService.getUserDetails(this.sessionID).subscribe(respuesta => {
        this.userName = respuesta.username;
        this.avatarPath = `https://www.themoviedb.org/t/p/w32_and_h32_face/${respuesta.avatar.tmdb.avatar_path}`
        this.accountID = String(respuesta.id);
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
      window.location.href=`https://www.themoviedb.org/authenticate/${this.authToken}?redirect_to=http://localhost:4200${this.router.url}`
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
            this.accountID = String(respuesta.id);
            localStorage.setItem('account_id', this.accountID);
          });
        });
        this.sessionActive = true;
      }
    });
  }

  deleteSession(sessionID: string | null) {
    Swal.fire({
      title: '¿Estás seguro que quieres cerrar sesión?',
      text: "Podrás volver a iniciar sesión cuando quieras",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if(sessionID != null) {
          let sessionDelete = new DeleteSessionDto();
          sessionDelete.session_id = sessionID;
          this.authService.deleteSession(sessionDelete);
          localStorage.removeItem('session_id');
          localStorage.removeItem('account_id');
          this.sessionID = null;
          this.sessionActive = false;
          if (this.router.url.endsWith('true')) {
              window.location.href=`http://localhost:4200${this.router.url.split('?')[0]}`;
          }else if(this.router.url.includes('rated-films')){
            window.location.href=`http://localhost:4200/films`;
          }else if(this.router.url.includes('favorite-films')) {
            window.location.href=`${environment.appUrl}/films`
          }else {
              window.location.href=`http://localhost:4200${this.router.url}`;
          }
        }
      }
    })
  }

}
