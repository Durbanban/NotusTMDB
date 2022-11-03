import { Component, OnInit } from '@angular/core';
import { Series } from 'src/app/interfaces/series.interfaces';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  SeriesList: Series[] = [];

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
  }

  getListadoSeries(series: Series){

    this.seriesService.getSeries(series).subscribe((resp) => {

      this.SeriesList = resp.genres;
    })
  }

}
