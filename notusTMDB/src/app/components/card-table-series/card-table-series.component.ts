import { Component, OnInit } from '@angular/core';
import { Series } from 'src/app/interfaces/series.interaces';
import { SeriesDetailsResponse } from 'src/app/interfaces/series-details.interfaces';
import { SeriesService } from 'src/app/services/series.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-card-table-series',
  templateUrl: './card-table-series.component.html',
  styleUrls: ['./card-table-series.component.css']
})
export class CardTableSeriesComponent implements OnInit {

seriesList : Series[] = [];
seriesListDetails: SeriesDetailsResponse[] = [];

constructor(private seriesService: SeriesService) { } //router: Router

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
