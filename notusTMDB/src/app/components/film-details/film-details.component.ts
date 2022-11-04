import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmDetailsResponse } from 'src/app/interfaces/filmDetails.interface';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  id : number
  film : FilmDetailsResponse = {} as FilmDetailsResponse

  constructor(private router : Router, private filmsService : FilmsService) { }

  ngOnInit(): void {
    this.id = Number(this.router.url.split('/')[2])

    this.filmsService.getFilmById(this.id).subscribe((a) => {
      this.film = a
    })
  }

}
