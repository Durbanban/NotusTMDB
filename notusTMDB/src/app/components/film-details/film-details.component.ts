import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FilmDetailsResponse } from 'src/app/interfaces/filmDetails.interface';
import { Videos } from 'src/app/interfaces/videos.interface';
import { FilmsService } from 'src/app/services/films.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  id : number
  film : FilmDetailsResponse = {} as FilmDetailsResponse
  listadoVideos : Videos[] = []

  constructor(private router : Router, private filmsService : FilmsService, private videosService : VideoService, private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    this.id = Number(this.router.url.split('/')[2])

    this.filmsService.getFilmById(this.id).subscribe((a) => {
      this.film = a
    })

    this.videosService.getAllVideos(this.id).subscribe(a => {
      a.results.filter(b => {
        if (b.type == 'Trailer') {
          this.listadoVideos.push(b)
        }
      })
    })
  }

  getFilmImg(f : FilmDetailsResponse){
    return `https://image.tmdb.org/t/p/w500${f.poster_path}`
  }

  getFilmPoster(f : FilmDetailsResponse){
    return `https://image.tmdb.org/t/p/w500${f.backdrop_path}`
  }

  getUrlVideo(v : Videos){
    let url = `https://www.youtube.com/embed/${v.key}`

    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
