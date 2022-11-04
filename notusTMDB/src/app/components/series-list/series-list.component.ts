import { Component, OnInit } from '@angular/core';
import { Series } from 'src/app/interfaces/series.interaces';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  seriesList: Series[] = [];

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
  }

  getListadoSeries(id: number){

    this.seriesService.getSeries(id).subscribe((resp) => {

      this.seriesList = resp.results
    });
  }

}
