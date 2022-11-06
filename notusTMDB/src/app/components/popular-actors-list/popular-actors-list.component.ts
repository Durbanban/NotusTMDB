import { Component, Input, OnInit } from '@angular/core';
import { Actor } from 'src/app/interfaces/actor.interface';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-popular-actors-list',
  templateUrl: './popular-actors-list.component.html',
  styleUrls: ['./popular-actors-list.component.css']
})
export class PopularActorsListComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  actorList: Actor[] = [];
  page = 1;
  totalPages = 0;
  buscarBool = false;
  buscarStr = '';

  constructor(private actorService: ActorService ) { }

  ngOnInit(): void {
    this.getPopular(this.page);
  }

  getPopular(page: number) {
    this.actorService.getPopularActors(page).subscribe(respuesta => {
      this.totalPages = respuesta.total_pages;
      this.actorList = respuesta.results;
    });
    this.page = page;
  }

  buscar() {
    this.buscarBool = !this.buscarBool;
  }

  getActorImg(actor: Actor) {
    return `https://image.tmdb.org/t/p/w500${actor.profile_path}`
  }

  numPages() {
    return Array(this.totalPages);
  }

}
