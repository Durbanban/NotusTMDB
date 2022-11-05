import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  authToken = '';
  sessionID: string | null = '';

  ngOnInit(): void {
    this.sessionID = localStorage.getItem('session_id');
  }

  requestToken() {
    this.authService.createRequestToken().subscribe(respuesta => {
      if(respuesta.success) {
        this.authToken = respuesta.request_token;
        window.location.href=`https://www.themoviedb.org/authenticate/${this.authToken}?redirect_to=http://localhost:4200/portada`
      }
    });
  }

}
