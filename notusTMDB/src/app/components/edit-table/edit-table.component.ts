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
  actors: Cast[] = [];
  actorsFour: Cast[] = [];

  ngOnInit(): void {
    this.filmsService.getFilms().subscribe((a) => {
      this.listadoFilms = a.results

      this.filmsService.getFilmCredits(this.listadoFilms[1].id).subscribe((a) => {
        this.actors = a.cast
      
        for (let i = 0; i < 4; i++) {
          this.actorsFour.push(this.actors[i])
        }
        console.log(this.actorsFour)
      })
    })
  }

  getFilmImg(film: Films) {
    return `https://image.tmdb.org/t/p/w500${film.poster_path}`;
  }

  getActors(film: Films) {

  }

  getActorsImg(act : Cast){
    return `https://image.tmdb.org/t/p/w500${act.profile_path}`
  }
}