import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorDetailsResponse } from 'src/app/interfaces/actor-details.interface';
import { Filmography } from 'src/app/interfaces/combined-credits.interface';
import { ActorDetailsService } from 'src/app/services/actor-details.service';
import { CreditsService } from 'src/app/services/credits.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {

  detallesActor: ActorDetailsResponse = {} as ActorDetailsResponse;
  actorFilmography: Filmography[] = [];
  actorFilms: Filmography[] = [];
  actorSeries: Filmography[] = [];
  today = Date.now();

  constructor(private actorDetailsService: ActorDetailsService,
    private creditsService: CreditsService,
    private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarActor();
  }
  
  cargarActor() {
    const actorID = Number(this.ruta.snapshot.paramMap.get('id'));
    this.actorDetailsService.getById(actorID).subscribe(actor => {
      this.detallesActor = actor;
      this.creditsService.getActorFilmography(actorID).subscribe(respuesta => {
        this.actorFilmography = respuesta.cast;
        this.actorFilmography.filter(peli => {
          if(peli.media_type == 'movie') {
            this.actorFilms.push(peli);
          }else if(peli.media_type == 'tv') {
            this.actorSeries.push(peli);
          }
        });
      });
    });
    
  }

  getActorImg(actor: ActorDetailsResponse) {
    return `${environment.apiImgUrl}/${actor.profile_path}`
  }

  getFilmImg(peli: Filmography) {
    return `https://image.tmdb.org/t/p/w500${peli.poster_path}`
  }

  getRuta(peli: Filmography): string {
    if(peli.media_type == 'movie') {
      return 'films'
    }else if(peli.media_type == 'tv') {
      return 'series'
    }
  }

  

}
