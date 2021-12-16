import { Component, OnInit } from '@angular/core';
import { Assignment3Service } from './assignment3.service';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.scss']
})
export class Assignment3Component implements OnInit {

  public airportArrays=[];
  public airportCols=[];

  public flightArrays=[]
  public flightCols=[];

  constructor(private a3Service:Assignment3Service) {}

  ngOnInit() {
    
    this.a3Service.getFlightCSV().then(()=>{
      this.flightArrays=this.a3Service.flightJsonArrays;
      this.flightCols=this.a3Service.flightColNames;
    });

    this.a3Service.getAirportCSV().then(()=>{
      this.airportArrays=this.a3Service.airportJsonArrays;
      this.airportCols=this.a3Service.airportColNames;
    });
  }

}
