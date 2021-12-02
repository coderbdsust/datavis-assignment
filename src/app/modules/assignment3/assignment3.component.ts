import { Component, OnInit } from '@angular/core';
import { Assignment3Service } from './assignment3.service';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.scss']
})
export class Assignment3Component implements OnInit {

  public airportsArrays=[];
  public airportsCols=[];

  public flightsArrays=[]
  public flightCols=[];

  constructor(private a3Service:Assignment3Service) {}

  ngOnInit() {
    
    this.a3Service.getFlightCSV().then(()=>{
      console.log('Flight Cols: '+this.a3Service.flightColNames.length);
      console.log(this.a3Service.flightJsonArrays.length);
      this.flightsArrays=this.a3Service.flightJsonArrays;
      this.flightCols=this.a3Service.flightColNames;
    });

    this.a3Service.getAirportsCSV().then(()=>{
      console.log("Airport Cols: "+this.a3Service.airportsColNames.length);
      console.log(this.a3Service.airportsJsonArrays.length);
      this.airportsArrays=this.a3Service.airportsJsonArrays;
      this.airportsCols=this.a3Service.airportsColNames;
    });
  }

}
