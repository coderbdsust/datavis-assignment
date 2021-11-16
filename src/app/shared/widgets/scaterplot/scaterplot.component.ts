import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { DashboardService } from 'src/app/modules/dashboard.service';
import { Underscore } from 'underscore';

declare var _: Underscore<any>;

@Component({
  selector: 'app-scaterplot',
  templateUrl: './scaterplot.component.html',
  styleUrls: ['./scaterplot.component.scss']
})
export class ScaterplotComponent implements OnInit {

  carsJsonArray=[];
  carJsonColumnNames=[];
  
  private svg;
  private margin = 50;
  private width = 1200 - (this.margin * 2);
  private height = 600 - (this.margin * 2);
  private xColName='Retail Price';
  private yColName='Horsepower(HP)';

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getCSV().then(() => {
      this.carsJsonArray = this.dashboardService.carsJsonArray;
      this.carJsonColumnNames = this.carJsonColumnNames;
    })
   }

  ngOnInit() {
    this.createSvg();
    this.drawPlot();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }


  private drawPlot(): void {
    const xMinCar = _.min(this.carsJsonArray, item=>{return item[this.xColName]});
    const xMaxCar = _.max(this.carsJsonArray, item=>{return item[this.xColName]});

    const yMinCar = _.min(this.carsJsonArray, item=>{return item[this.yColName]});
    const yMaxCar = _.max(this.carsJsonArray, item=>{return item[this.yColName]});
  
    console.log(xMaxCar[this.xColName]+" "+xMinCar[this.xColName]);

    console.log(yMaxCar[this.yColName]+" "+yMinCar[this.yColName]);

    const x = d3.scaleLinear()
    .domain([xMinCar[this.xColName], xMaxCar[this.xColName]])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([70, 500])
    .range([ this.height, 0]);

    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');

    dots.selectAll("dot")
    .data(this.carsJsonArray)
    .enter()
    .append("circle")
    .attr("cx", d => x(d[this.xColName]))
    .attr("cy", d => y(d[this.yColName]))
    .attr("r", 8)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    const xLabel = this.svg.append('g');

    // Add labels
    xLabel.append("text")             
    .attr("transform",
          "translate(" + (this.width/2) + " ," + 
                         (this.height + this.margin) + ")")
    .style("text-anchor", "middle")
    .text(this.xColName +(' (€)'));

    const yLabel = this.svg.append('g');

    // Add labels
    yLabel.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - this.margin)
    .attr("x", 0 - (this.height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(this.yColName);
  }
}
