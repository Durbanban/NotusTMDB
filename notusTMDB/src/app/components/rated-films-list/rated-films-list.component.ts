import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CreateFavDto } from "src/app/dto/create-fav-dto";
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
  favoriteDto : CreateFavDto = {} as CreateFavDto;
  changeFilmFav : Film = {} as Film;
  favFilm : boolean
  filmArray : Film[] = []

  constructor(private filmsService: FilmsService, private auth: AuthService, private router : Router) {}

  ngOnInit(): void {

    if (this.sessionID != null) {
      this.auth.getUserDetails(this.sessionID).subscribe((a) => {
        this.filmsService.getRatedFilms(a.id, this.sessionID).subscribe(b => {
          this.filmsService.getFavoriteFilms(localStorage.getItem('session_id'), localStorage.getItem('account_id')).subscribe(a => {
            this.filmArray = a.results
          });

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

  marcarFav(f : Film) {
    if (this.filmArray.map(ratedFilm => ratedFilm.id).includes(f.id)) {
      this.favoriteDto.favorite = false
    }else{
      this.favoriteDto.favorite = !this.favoriteDto.favorite;
    }
    
    this.favoriteDto.media_id = f.id
    this.favoriteDto.media_type = 'movie'
    this.filmsService.markFavFilm(Number(localStorage.getItem('account_id')), this.sessionID, this.favoriteDto).subscribe(a => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Tu lista de favoritas se ha actualizado',
        showConfirmButton: false,
        timer: 1500
      }).then(a => {
        location.reload()
      });
    });
  }

  comprobarFav(f:Film){
    if(this.filmArray.map(ratedFilm => ratedFilm.id).includes(f.id)){
      return true;
    }else {
      return false;
    }
  }
}
