import { Component, OnInit } from "@angular/core";
import { Series } from "src/app/interfaces/series.interaces";
import { SeriesService } from "src/app/services/series.service";

@Component({
  selector: "app-rate-series",
  templateUrl: "./rate-series.component.html",
  styleUrls: ["./rate-series.component.css"],
})
export class RateSeriesComponent implements OnInit {
  sessionID: string;
  seriesList: Series[] = [];

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.sessionID = localStorage.getItem("session_id");
    this.getRatedSeries();
  }

  getRatedSeries() {
    this.seriesService.getRateSeries2().subscribe((rep) => {
      this.seriesList = rep.results;
    });
  }
  getImgSeries(series: Series){

    return `https://image.tmdb.org/t/p/w500/${series.poster_path}`;

  }

}
