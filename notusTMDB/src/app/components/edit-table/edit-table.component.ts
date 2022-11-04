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

  constructor(private filmsService: FilmsService) { }

  listadoFilms: Films[] = [];
  listadoAllFilm: Films[] = [];
  page = 1;
  totalPages = 0
  buscarBool = false
  buscarStr = ''

  ngOnInit(): void {
    this.getFilms(this.page);

    this.listadoAllFilm = this.filmsService.getAllFilms()
  }

  getFilms(n : number){
    this.filmsService.getFilms(n).subscribe((a) => {
      this.listadoFilms = a.results
      this.totalPages = 500
    });
    this.page = n;
  }

  numPages() {
    return Array(this.totalPages);
  }

  getFilmImg(film: Films) {
    return `https://image.tmdb.org/t/p/w500${film.poster_path}`;
  }

  buscar(){
    this.buscarBool = !this.buscarBool
  }
}