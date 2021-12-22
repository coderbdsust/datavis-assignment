import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/modules/dashboard/dashboard.service";
import * as d3 from "d3";
@Component({
  selector: "app-starplot",
  templateUrl: "./starplot.component.html",
  styleUrls: ["./starplot.component.scss"],
})
export class StarplotComponent implements OnInit {

  private svg: any;
  private margin = { top: 15, left: 15, right: 15, bottom: 15 };
  private width = 230;
  private labelMargin = 5;
  private includeGuideLines = true;
  private includeLabels = true;
  private accessors = [];
  private gLabels = ['A', 'B', 'C', 'D', 'E'];
  private title='Toyota Car - Star Plot';
  private g: any;
  private datum: any;
  private radius: any;
  private origin: any;
  private radii: any;
  private radians: any;
  private scale: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.createSvg();
  }

  private initalize() {

    this.radius = this.width / 2;

    this.origin = [this.radius, this.radius];

    let scale = d3.scaleLinear().domain([0, 100]).range([0, this.radius]);

    this.scale = scale;

    // Initialize the accessor data
    [5, 6, 9, 10, 5].forEach(d => {
      this.accessors.push((d) => {return scale(d);});
    });

    this.radii = this.accessors.length;

    this.radians = (2 * Math.PI) / this.radii;

    let selection = d3.select("figure#starplot");

    this.svg = selection.append("svg")
    .attr("width", this.width + (this.margin.left * 2))
    .attr("height", this.width + (this.margin.top * 2))
    .style('background','green')

    this.g = this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.right + ")"
      );

    this.datum = this.svg.datum;

  }

  private createSvg(): void {

    this.initalize();

    if (this.includeGuideLines) {
      this.drawGuidelines();
    }

    if (this.includeLabels) {
      this.drawLabels();
    }

    this.drawChart();
  }

  private drawGuidelines() {
    let r = 0;
    let locRadian = this.radians;
    let radius = this.radius;
    let graph = this.g;
    let origin = this.origin;
    this.accessors.forEach(function (d, i) {
      let l, x, y;
      l = radius;
      x = l * Math.cos(r);
      y = l * Math.sin(r);
      graph
        .append("line")
        .attr("class", "star-axis")
        .attr("x1", origin[0])
        .attr("y1", origin[1])
        .attr("x2", origin[0] + x)
        .attr("y2", origin[1] + y);
      r += locRadian;
    });
  }

  private drawLabels() {
    let r = 0;
    let labels = this.gLabels;
    let labelMargin = this.labelMargin;
    let graph = this.g;
    let radius = this.radius;
    let radians = this.radians;
    let origin = this.origin;

    this.accessors.forEach(function (d, i) {

      let l, x, y;
      l = radius;
      x = (l + labelMargin) * Math.cos(r);
      y = (l + labelMargin) * Math.sin(r);

      graph
        .append("text")
        .attr("class", "star-label")
        .attr("x", origin[0] + x)
        .attr("y", origin[1] + y)
        .text(labels[i])
        .style("text-anchor", "middle")
        .style("dominant-baseline", "central");

      r += radians;

    });
  }

  private drawChart() {

    let path = d3.lineRadial();
    let pathData = [];
    let r = Math.PI / 2;
    let scale = this.scale;
    let datum = this.datum;
    let radians = this.radians;
    let origin = this.origin;
    let margin = this.margin;
    
    this.g
      .append("circle")
      .attr("class", "star-origin")
      .attr("cx", origin[0])
      .attr("cy", origin[1])
      .attr("r", 2);

    this.accessors.forEach(function (d) {
      let locD = [scale(d(datum)), r];
      console.log(locD);
      pathData.push(locD);
      r += radians;
    });

    let title = (d) => {return this.title};

    this.g
      .append("path")
      .attr("class", "star-path")
      .attr("transform", "translate(" + origin[0] + "," + origin[1] + ")")
      .attr("d", path(pathData) + 'Z');

    this.g
      .append("text")
      .attr("class", "star-title")
      .attr("x", origin[0])
      .attr("y", -(margin.top/2))
      .text(title(datum))
      .style("text-anchor", "middle");
  }
}
