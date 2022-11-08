import { Component, OnInit } from "@angular/core";
import { Series } from "src/app/interfaces/series.interaces";
import {
  SeriesDetails,
  SeriesDetailsResponse,
} from "src/app/interfaces/series-details.interfaces";
import { SeriesService } from "src/app/services/series.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Videos } from "src/app/interfaces/videos.interface";
import { DomSanitizer } from "@angular/platform-browser";
import { CreateRateDto } from "src/app/dto/create-rate.dto";
import Swal from "sweetalert2";
import { VideosSeries } from "src/app/interfaces/videosSeries.interfaces";

@Component({
  selector: "app-card-table-series",
  templateUrl: "./card-table-series.component.html",
  styleUrls: ["./card-table-series.component.css"],
})
export class CardTableSeriesComponent implements OnInit {
  seriesList: Series[] = [];
  seriesListDetails: SeriesDetailsResponse = {} as SeriesDetailsResponse;
  rate: CreateRateDto = {} as CreateRateDto;
  ValorR: number;
  id: string;
  stars: number[] = [1, 2, 3, 4, 5];
  valido = false;
  videosList: VideosSeries[] = [];
  seasons: number;
  sessionID: string;
  series: Series;
  selectedValue: number;
  constructor(
    private seriesService: SeriesService,
    private router: Router,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.router.url.split("/")[2].split("?")[0];
    this.sessionID = localStorage.getItem("session_id");
    this.getVideosBuenos();
    this.getDetails();
    this.getListadoSeries();
    this.seriesService.getSeriesDetails2(this.id).subscribe((resp) => {
      this.series = resp;
    });
  }
  getVideosBuenos() {
    this.seriesService.getVideos(this.id).subscribe((resp) => {
      this.videosList = resp.results;
    });
  }
  getListadoSeries() {
    this.seriesService.getSeries().subscribe((resp) => {
      this.seriesList = resp.results;
    });
  }

  getImgSeries(series: Series) {
    return `https://image.tmdb.org/t/p/w500/${series.backdrop_path}`;
  }

  getSeriesPoster(series: SeriesDetailsResponse) {
    return `https://image.tmdb.org/t/p/w500/${series.poster_path}`;
  }

  getVideoTrailer(video: VideosSeries) {
    let url = `https://www.youtube.com/embed/${video.key}`;

    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getSeasons(seasons: SeriesDetailsResponse) {
    return seasons.seasons;
  }

  getDetails() {
    this.seriesService.getSeriesDetails(this.id).subscribe((resp) => {
      this.seriesList = resp.results;
    });
  }
  countStar(star: number) {
    this.rate.value = star;
    this.selectedValue = star;
    this.seriesService
      .getRatedSeries(this.id, this.rate)
      .subscribe((resp) => {});
  }
}
