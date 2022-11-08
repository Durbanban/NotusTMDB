import { Component, OnInit } from '@angular/core';
import { Series } from 'src/app/interfaces/series.interaces';
import { SeriesDetailsResponse } from 'src/app/interfaces/series-details.interfaces';
import { SeriesService } from 'src/app/services/series.service';
import { Router } from '@angular/router';
import { ViseosServicesSeriesService } from 'src/app/services/viseosSeriesServices.service';
import { AuthService } from 'src/app/services/auth.service';
import { Videos } from 'src/app/interfaces/videos.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { CreateRateDto } from 'src/app/dto/create-rate.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-table-series',
  templateUrl: './card-table-series.component.html',
  styleUrls: ['./card-table-series.component.css']
})
export class CardTableSeriesComponent implements OnInit {

seriesList : Series[] = [];
seriesListDetails: SeriesDetailsResponse = {} as SeriesDetailsResponse;
rate: CreateRateDto = {} as CreateRateDto;
ValorR: number;
id: number;
valido = false;
videosList: Videos[] = []

constructor(private seriesService: SeriesService, router: Router, private videosServicesSeries: ViseosServicesSeriesService, private auth: AuthService, private sanitizer: DomSanitizer) { } 

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

getSeriesPoster(series: SeriesDetailsResponse){

  return `https://image.tmdb.org/t/p/w500/${series.poster_path}`;
}

getVideoTrailer(video: Videos){

  return this.sanitizer.bypassSecurityTrustUrl(`https://www.youtube.com/embed/${video.key}`)
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
