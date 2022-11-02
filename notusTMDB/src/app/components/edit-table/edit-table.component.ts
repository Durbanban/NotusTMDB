import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits.interface';
import { Films } from 'src/app/interfaces/films.interface';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private filmsService : FilmsService) {}

  listadoFilms : Films[] = [];
  listadoCredits : Cast[] = [];
  idFilm : number;
  listaCuatroImg : Cast[] = [];

  ngOnInit(): void {
    this.filmsService.getFilms().subscribe((a) => {
      this.listadoFilms = a.results
    })    
  }

  getFilmImg(film: Films) {
    return `https://image.tmdb.org/t/p/w500${film.poster_path}`;
  }

  getFilmCredits(film: Films) {
    this.filmsService.getFilmCredits(film.id).subscribe((a) => {
      this.listadoCredits = a.cast
    })

    for (let i = 0; i < 4; i++) {
      if (this.listadoCredits[i].department == 'Acting') {
        this.listaCuatroImg.push(this.listadoCredits[i])
      }
    }

    return this.listaCuatroImg
  }
}