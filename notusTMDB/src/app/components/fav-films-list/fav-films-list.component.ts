import { Component, OnInit } from '@angular/core';
import { CreateFavDto } from 'src/app/dto/create-fav-dto';
import { Film } from 'src/app/interfaces/ratedFilmsList.interface';
import { FilmsService } from 'src/app/services/films.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fav-films-list',
  templateUrl: './fav-films-list.component.html',
  styleUrls: ['./fav-films-list.component.css']
})
export class FavFilmsListComponent implements OnInit {

  listadoFavFilms: Film[] = [];
  listadoRatedFilms: Film[] = [];
  sessionID :string
  vacioBool : boolean;
  favoriteDto: CreateFavDto = {} as CreateFavDto;

  constructor(private filmsService: FilmsService) { }

  ngOnInit(): void {
    this.sessionID = localStorage.getItem("session_id");
    this.cargarPelisFavoritas();
    this.cargarPelisValoradas();
    
  }

  cargarPelisFavoritas() {
    if (this.sessionID != null) {
      
        this.filmsService.getFavoriteFilms(this.sessionID, localStorage.getItem('account_id')).subscribe(b => {
          this.listadoFavFilms = b.results;
          this.filmsService.getRatedFilms(Number(localStorage.getItem('account_id')), this.sessionID).subscribe(respuesta => {
            this.listadoRatedFilms = respuesta.results;
          });

          if (this.listadoFavFilms.length > 0) {
            this.vacioBool = false
          }else{
            this.vacioBool = true
          }
        });
 
    }

  }

  cargarPelisValoradas() {
    if(this.sessionID != null) {
      this.filmsService.getRatedFilms(Number(localStorage.getItem('account_id')), this.sessionID).subscribe(respuesta => {
        this.listadoRatedFilms = respuesta.results;
      })
    }
  }

  getFilmImg(f: Film) {
    return `https://image.tmdb.org/t/p/w500${f.poster_path}`
  }

  marcarFav(account_id : number) {
    this.favoriteDto.favorite = !this.favoriteDto.favorite;
    this.filmsService.markFavFilm(Number(localStorage.getItem('account_id')), this.sessionID, this.favoriteDto).subscribe(a => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Tu valoración se ha eliminado con éxito',
        showConfirmButton: false,
        timer: 1500
      }).then(a => {
        location.reload()
      });
    });
  }

  eliminarRate(peli : Film) {
    this.favoriteDto.favorite = false;
    this.favoriteDto.media_id = peli.id;
    this.favoriteDto.media_type = "movie";
    this.filmsService.markFavFilm(Number(localStorage.getItem('account_id')), localStorage.getItem("session_id"), this.favoriteDto).subscribe(a => {
       if(a.success){
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Se ha desmarcado como favorito',
            showConfirmButton: false,
            timer: 1500
          }).then(a => {
            location.reload()
          });
       }
    });
  }

  comprobarRating(film: Film) {
    if(this.listadoRatedFilms.map(ratedFilm => ratedFilm.id).includes(film.id)){
      return true;
    }else {
      return false;
    }
  }

}
