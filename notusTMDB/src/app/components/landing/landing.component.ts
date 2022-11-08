import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { AccountDetailsResponse } from 'src/app/interfaces/account-details.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  hora !: number
  contador = interval(1000)
  iniciada : boolean
  cuenta : AccountDetailsResponse = {} as AccountDetailsResponse

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.contador.subscribe((a) => {
      this.hora = a
    })

    this.auth.getUserDetails(localStorage.getItem('session_id')).subscribe(a => {
      this.cuenta = a
      console.log(this.cuenta.name);
    })

    if (localStorage.getItem('session_id') != null) {
      this.iniciada = true
    }else{
      this.iniciada = false
    }
  }

}
