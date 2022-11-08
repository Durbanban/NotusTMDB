import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Film } from "src/app/interfaces/ratedFilmsList.interface";
import { AuthService } from "src/app/services/auth.service";
import { FilmsService } from "src/app/services/films.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-rated-films-list",
  templateUrl: "./rated-films-list.component.html",
  styleUrls: ["./rated-films-list.component.css"],
})
export class RatedFilmsListComponent implements OnInit {
  listadoRatedFilms: Film[] = [];
  sessionID = localStorage.getItem("session_id");
  vacioBool : boolean;

  constructor(private filmsService: FilmsService, private auth: AuthService, private router : Router) {}

  ngOnInit(): void {

    if (this.sessionID != null) {
      this.auth.getUserDetails(this.sessionID).subscribe((a) => {
        this.filmsService.getRatedFilms(a.id, this.sessionID).subscribe(b => {
          this.listadoRatedFilms = b.results

          if (this.listadoRatedFilms.length > 0) {
            this.vacioBool = false
          }else{
            this.vacioBool = true
          }
        })
      });
    }
  }

  getFilmImg(f: Film) {
    return `https://image.tmdb.org/t/p/w500${f.poster_path}`
  }

  eliminarRate(id : number) {
    this.filmsService.deleteRateFilm(id, this.sessionID).subscribe(a => {
      if (a.success) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Tu valoración se ha eliminado con éxito',
          showConfirmButton: false,
          timer: 1500
        }).then(a => {
          location.reload()
        })
      }
    })
  }
}
