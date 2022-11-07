import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-card-table-series',
  templateUrl: './card-table-series.component.html',
  styleUrls: ['./card-table-series.component.css']
})
export class CardTableSeriesComponent implements OnInit {

seriesList = Series[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
