import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeriesDetailsResponse } from 'src/app/interfaces/series-details.interfaces';
import { Series } from 'src/app/interfaces/series.interaces';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  seriesList: Series[] = [];
  seriesListDetails: SeriesDetailsResponse[] = [];

  constructor(private seriesService: SeriesService, router: Router) { }

  ngOnInit(): void {
    
    this.getListadoSeries();

  }

  getListadoSeries(){

    this.seriesService.getSeries().subscribe((resp) => {

      this.seriesList = resp.results;
    });
  }

  getImgSeries(series: Series){

    return `https://image.tmdb.org/t/p/w500/${series.backdrop_path}`;

  }


}
