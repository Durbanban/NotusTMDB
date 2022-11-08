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
  valido = false;
  videosList: VideosSeries[] = [];
  seasons: number;
  series: Series;

  constructor(
    private seriesService: SeriesService,
    private router: Router,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.router.url.split("/")[2].split("?")[0];
    this.getDetails();
    this.seriesService.getSeriesDetails2(this.id).subscribe((resp) => {

      this.series = resp;
    });

    this.getListadoSeries();
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

    let url = `https://www.youtube.com/embed/${video.key}`

    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getSeasons(seasons: SeriesDetailsResponse) {
    return seasons.seasons;
  }

  getDetails(){

    this.seriesService.getSeriesDetails(this.id).subscribe((resp) => {

      this.seriesList = resp.results;
    })
  }

  /*
go(){
  this.rate.value = this.ValorR
  
  this.seriesService.getRateSeries2(this.rate, this.id, localStorage.getItem('session_id')).subscribe(rep => {

    if(rep.success){

      this.valido = true

      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Tu valoración se ha enviado correctamente',
        showConfirmButton: false,
        timer: 1500
      
      }).then( resp => {
       
        location.reload()
      })
    }

  });
}
*/
}
