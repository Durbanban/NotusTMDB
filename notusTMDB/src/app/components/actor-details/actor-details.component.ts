import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorDetailsResponse } from 'src/app/interfaces/actor-details.interface';
import { ActorDetailsService } from 'src/app/services/actor-details.service';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {

  detallesActor: ActorDetailsResponse = {} as ActorDetailsResponse;

  constructor(private actorDetailsService: ActorDetailsService,
    private ruta: ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  cargarActor() {
    const actorID = Number(this.ruta.snapshot.paramMap.get('id'));
    this.actorDetailsService.getById(actorID);
    

  }

}
