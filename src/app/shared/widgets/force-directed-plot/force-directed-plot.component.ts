import { Component, OnInit } from '@angular/core';
import { Assignment3Service } from 'src/app/modules/assignment3/assignment3.service';
import * as d3 from "d3";

@Component({
  selector: 'app-force-directed-plot',
  templateUrl: './force-directed-plot.component.html',
  styleUrls: ['./force-directed-plot.component.scss']
})
export class ForceDirectedPlotComponent implements OnInit {

  private svg: any;
  private margin = 60;
  private width = 1000 - this.margin * 2;
  private height = 600 - this.margin * 2;
  private flightJsonArrays=[];
  private flightColNames=[];
  
  constructor(private a3Service:Assignment3Service) { }

  ngOnInit() {
    this.a3Service.getFlightCSV().then(()=>{
      
      this.flightJsonArrays=this.a3Service.flightJsonArrays;
      this.flightColNames=this.a3Service.flightColNames;
      
      console.log('Flight Json Len: '+this.flightJsonArrays.length);
      console.log('Flight Cols Len: '+this.flightColNames.length);

      this.createSVG();
      this.drawPlot();

    });
  }


  private createSVG(): void {
    this.svg = d3
      .select("figure#force-directed-graph")
      .append("svg")
      .attr("width",this.width + this.margin*2)
      .attr("height",this.height + this.margin*2)
  }

  private drawPlot():void{

  }

}
