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
  
  private svg:any;
  private margin = 80;
  private marginBottom = 120;
  private width = 1200 - (this.margin * 2);
  private height = 600 - (this.margin * 2);
  private xColName='Retail Price';
  private yColName='Horsepower(HP)';
  private scatterPlotName='Car Dataset Visualization';

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
    .attr("width", this.width + (this.margin * 3))
    .attr("height", this.height + (this.margin + this.marginBottom))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }


  private drawPlot(): void {

    let xAxisMin = this.dashboardService.getMin(this.carsJsonArray, this.xColName);
    let xAxisMax = this.dashboardService.getMax(this.carsJsonArray, this.xColName);

    let yAxisMin = this.dashboardService.getMin(this.carsJsonArray, this.yColName);
    let yAxisMax = this.dashboardService.getMax(this.carsJsonArray, this.yColName);

    // dynamic color creation for the type
    // let carTypeColors = this.dashboardService.getGetUniqueColors(this.carsJsonArray);
    
    let carTypeColors = {
      "Minivan": "#4400e8",
      "SUV": "#008000",
      "Sedan": "#391698",
      "Sports Car": "#b63055",
      "Wagon": "#a196cf"};

    const x = d3.scaleLinear()
    .domain([xAxisMin, xAxisMax])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // create Y axis scale
    const y = d3.scaleLinear()
    .domain([yAxisMin, yAxisMax])
    .range([ this.height, 0]);

    this.svg.append("g")
    .call(d3.axisLeft(y));

    //add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.carsJsonArray)
    .enter()
    .append("circle")
    .attr("cx", d => x(d[this.xColName]))
    .attr("cy", d => y(d[this.yColName]))
    .attr("r", 6)
    .style("opacity", 0.7)
    .style("fill", (d)=>{return carTypeColors[d['Type']]});

    const scatterPlotLabel = this.svg.append('g');

    // add scatterplot name label
    scatterPlotLabel.append("text")
    .attr("transform",
          "translate(" + (this.width/2) + " ," +
                         (this.height + this.marginBottom - 10) + ")")
    .attr("font-weight", "bold")
    .style("text-anchor", "middle")
    .text(this.scatterPlotName);

    const xLabel = this.svg.append('g');

    // add X axis labels
    xLabel.append("text")
    .attr("transform",
          "translate(" + (this.width/2) + " ," +
                         (this.height + this.margin - 30) + ")")
    .style("text-anchor", "middle")
    .text(this.xColName +(' (€)'));

    const yLabel = this.svg.append('g');

    // add Y axis labels
    yLabel.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - this.margin)
    .attr("x", 0 - (this.height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(this.yColName);

    const d3Legend = this.svg.append('g');
    
    let index=0;
    let offset=20;

    for (const oKey in carTypeColors) {
      let color = carTypeColors[oKey];
      console.log(oKey+' '+color);
      index++;

      let lastWidthAndLastMarginInBetween=100;
      d3Legend.append("text")
              .attr("transform",
              "translate(" + (this.width+lastWidthAndLastMarginInBetween) + " ," + (this.margin-index*offset) + ")")
              .style("text-anchor", "end")
              .text(oKey);

      d3Legend.append("circle")
              .attr("cx", this.width+lastWidthAndLastMarginInBetween+15)
              .attr("cy", this.margin-index*offset-5)
              .attr("r", 6)
              .style("opacity", 0.5)
              .style("fill", color);

      }
  }
}
