import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CreateRateDto } from 'src/app/dto/create-rate.dto';
import { FilmDetailsResponse } from 'src/app/interfaces/filmDetails.interface';
import { RatedFilm } from 'src/app/interfaces/ratedFilmsList.interface';
import { Videos } from 'src/app/interfaces/videos.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FilmsService } from 'src/app/services/films.service';
import { VideoService } from 'src/app/services/video.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  id: number;
  film: FilmDetailsResponse = {} as FilmDetailsResponse;
  rateDto: CreateRateDto = {} as CreateRateDto;
  listadoVideos: Videos[] = [];
  favIconBool = false;
  isVal = false;
  sessionID = localStorage.getItem('session_id');
  rateValue: number;
  ratedFilmsList: RatedFilm[] = []
  delButtonRate = false
  duracion : number

  constructor(private router: Router, private filmsService: FilmsService, private videosService: VideoService, private sanitizer: DomSanitizer, private auth: AuthService) { }

  ngOnInit(): void {
    this.id = Number((this.router.url.split('/')[2]).split('?')[0])
    this.filmsService.getFilmById(this.id).subscribe((a) => {
      this.film = a
      this.duracion = Number((this.film.runtime/60).toFixed(2))
    })

    this.videosService.getAllVideos(this.id).subscribe(a => {
      a.results.filter(b => {
        if (b.type == 'Trailer') {
          this.listadoVideos.push(b)
        }
      })
    })

    if (this.sessionID != null) {
      this.auth.getUserDetails(this.sessionID).subscribe(respuesta => {
        this.filmsService.getRatedFilms(respuesta.id, this.sessionID).subscribe(a => {
          this.ratedFilmsList = a.results

          this.ratedFilmsList.forEach(element => {
            if (element.id == Number((this.router.url.split('/')[2]).split('?')[0])) {
              this.isVal = true
              this.favIconBool = true
              this.rateValue = element.rating
              this.delButtonRate = true
            }else{
              this.rateValue = undefined
            }
          });
        })
      });
    }
  }

  getFilmImg(f: FilmDetailsResponse) {
    return `https://image.tmdb.org/t/p/w500${f.poster_path}`
  }

  getFilmPoster(f: FilmDetailsResponse) {
    return `https://image.tmdb.org/t/p/w500${f.backdrop_path}`
  }

  getUrlVideo(v: Videos) {
    let url = `https://www.youtube.com/embed/${v.key}`

    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  filmfav() {
    if (localStorage.getItem('session_id') != null) {
      if (this.rateValue >= 1) {
        this.favIconBool = true
      }else{
        this.favIconBool = !this.favIconBool
      }
    } else {
      Swal.fire('Inicia sesión para valorar esta película')
    }
  }

  enviar() {
    this.rateDto.value = this.rateValue
    this.filmsService.rateFilm(this.rateDto, this.id, localStorage.getItem('session_id')).subscribe(a => {
      if (a.success) {
        this.isVal = true
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Tu valoración se ha enviado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(a => {
          location.reload()
        })
      }
    });
  }

  eliminarRate() {
    this.filmsService.deleteRateFilm(this.film.id, this.sessionID).subscribe(a => {
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