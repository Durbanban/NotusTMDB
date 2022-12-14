import { Component, OnInit } from '@angular/core';
import { SeriesDetails, SeriesDetailsResponse } from 'src/app/interfaces/series-details.interfaces';
import { Series } from 'src/app/interfaces/series.interaces';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  seriesList: Series[] = [];
  seriesListDetails: SeriesDetails[] = [];

  constructor(private seriesService: SeriesService) { }

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
