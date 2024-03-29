import { Component, OnDestroy, OnInit, ViewChildren } from "@angular/core";
import { MatDialog } from "@angular/material";
import * as d3 from "d3";
import { fromEvent, Observable, Subscription } from "rxjs";
import { DashboardService } from "src/app/modules/dashboard/dashboard.service";
import { CommonService } from "../../common-service/common.service";
import { DialogDataViewerComponent } from "../dialog-data-viewer/dialog-data-viewer.component";

@Component({
  selector: "app-scaterplot",
  templateUrl: "./scaterplot.component.html",
  styleUrls: ["./scaterplot.component.scss"],
})
export class ScaterplotComponent implements OnInit, OnDestroy {

  // Unused Block-Start
  @ViewChildren("Figure") Figure: any;
  resizeObservable: Observable<Event>;
  resizeSubscription: Subscription;
  // Unused Block-End

  carsJsonArray = [];
  carJsonColumnNames = [];
  private svg: any;
  private margin = 80;
  private marginBottom = 120;
  private width = 1200 - this.margin * 2;
  private height = 600 - this.margin * 2;
  private xColName = "Retail Price";
  private yColName = "Horsepower(HP)";
  private scatterPlotName = "Figure - Multivariate Data Visualization";

  constructor(private dashboardService: DashboardService, private commonService: CommonService, public dialog:MatDialog) {}

  ngOnInit() {
    this.dashboardService.getCSV().then(() => {
      this.carsJsonArray = this.dashboardService.carsJsonArray;
      this.carJsonColumnNames = this.carJsonColumnNames;
      this.renderPlot();
    });

    // Window Resizing Listener
    // this.onWindowResizeSubscribe();
  }

  ngOnDestroy() {
    if (this.resizeSubscription) this.resizeSubscription.unsubscribe();
  }

  // Window Resize Observable - Not Used
  onWindowResizeSubscribe() {
    this.resizeObservable = fromEvent(window, "resize");
    this.resizeSubscription = this.resizeObservable.subscribe((event) => {
      this.onResize(event);
    });
  }

  onResize($event) {
    if (this.Figure && this.Figure.first && this.Figure.first.nativeElement) {
      let figureElm = this.Figure.first.nativeElement;
      //this.height = figureElm.clientHeight;
      //this.width = figureElm.clientWidth;
    }
  }

  openDialog(carData){
    this.dialog.open(DialogDataViewerComponent, {
      data: carData,
      disableClose: true
    });
  }

  renderPlot() {
    this.createSvg();
    this.drawPlot();
  }

  // Creating Graph Window Size
  private createSvg(): void {
    this.svg = d3
      .select("figure#scatter")
      .append("svg")
      .attr("width", this.width + this.margin * 3)
      .attr("height", this.height + (this.margin + this.marginBottom))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  // Drawing the graph in the area
  private drawPlot(): void {
    let xAxisMin = this.commonService.getMin(
      this.carsJsonArray,
      this.xColName
    );
    let xAxisMax = this.commonService.getMax(
      this.carsJsonArray,
      this.xColName
    );

    let yAxisMin = this.commonService.getMin(
      this.carsJsonArray,
      this.yColName
    );
    let yAxisMax = this.commonService.getMax(
      this.carsJsonArray,
      this.yColName
    );

    xAxisMax = this.roundAxisMaxValueUp(xAxisMax);
    yAxisMax = this.roundAxisMaxValueUp(yAxisMax);

    // dynamic color creation for the type
    // let carTypeColors = this.dashboardService.getGetUniqueColors(this.carsJsonArray);

    const circleArrays = this.carsJsonArray.filter(
      (d) => d["AWD"] === "1" && d["RWD"] === "0"
    );
    const rectArrays = this.carsJsonArray.filter(
      (d) => d["AWD"] === "0" && d["RWD"] === "1"
    );
    const blockRectArrays = this.carsJsonArray.filter(
      (d) => d["AWD"] === "0" && d["RWD"] === "0"
    );

    let carTypeColors = {
      Minivan: "#4400e8",
      SUV: "#ffd740",
      Sedan: "#01579b",
      "Sports Car": "#b63055",
      Wagon: "#a196cf",
    };

    let carWDShapes = {
      AWD: "circle",
      RWD: "rect",
      FWD: "filled rect",
    };

    // Create and Scaling X Axis
    const x = d3
      .scaleLinear()
      .domain([xAxisMin, xAxisMax])
      .range([0, this.width]);

    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Create and Scaling Y Axis
    const y = d3
      .scaleLinear()
      .domain([yAxisMin, yAxisMax])
      .range([this.height, 0]);

    this.svg.append("g").call(d3.axisLeft(y));

    const canvas = this.svg;

    // Drawing Border Rectangle Shape - RWD
    canvas
      .selectAll("dot")
      .data(rectArrays)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d[this.xColName]))
      .attr("y", (d) => y(d[this.yColName]))
      .attr("width", 8)
      .attr("height", 8)
      .style("opacity", 0.7)
      .attr("fill", "none")
      .attr("stroke-width", "3px")
      .attr("stroke", (d) => {
        return carTypeColors[d["Type"]];
      }).on("click",(event, d, n)=>{
        this.openDialog(d);
      }).on('mouseover', function (d, i) {
        d3.select(this).transition()
             .duration(20)
             .attr("width", 15)
             .attr("height", 15)
      })
      .on('mouseout', function (d, i) {
              d3.select(this).transition()
                  .duration(800)
                  .attr("width", 8)
                  .attr("height", 8);
       });

    // Drawing Circle Shape - AWD
    canvas
      .selectAll("dot")
      .data(circleArrays)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d[this.xColName]))
      .attr("cy", (d) => y(d[this.yColName]))
      .attr("r", 4)
      .style("opacity", 0.7)
      .attr("fill", "none")
      .attr("stroke-width", "3px")
      .attr("stroke", (d) => {
        return carTypeColors[d["Type"]];
      }).on("click",(event, d, n)=>{
        this.openDialog(d);
      }).on('mouseover', function (d, i) {
        d3.select(this).transition()
             .duration(20)
             .attr("r", 8);
      })
      .on('mouseout', function (d, i) {
              d3.select(this).transition()
                  .duration(800)
                  .attr("r", 4);
      });

    // Drawing Full Rectangle Shape - FWD
    canvas
      .selectAll("dot")
      .data(blockRectArrays)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d[this.xColName]))
      .attr("y", (d) => y(d[this.yColName]))
      .attr("width", 8)
      .attr("height", 8)
      .style("opacity", 0.7)
      .style("fill", (d) => {
        return carTypeColors[d["Type"]];
      }).on("click",(event, d, n)=>{
        this.openDialog(d);
      }).on('mouseover', function (d, i) {
        d3.select(this).transition()
             .duration(20)
             .attr("width", 12)
             .attr("height", 12)
      })
      .on('mouseout', function (d, i) {
              d3.select(this).transition()
                  .duration(800)
                  .attr("width", 8)
                  .attr("height", 8);
      });

    const scatterPlotLabel = this.svg.append("g");

    // Labeling Scatter Plot Name
    scatterPlotLabel
      .append("text")
      .attr(
        "transform",
        "translate(" +
          this.width / 2 +
          " ," +
          (this.height + this.marginBottom - 10) +
          ")"
      )
      .attr("font-weight", "bold")
      .style("text-anchor", "middle")
      .text(this.scatterPlotName);

    const xLabel = this.svg.append("g");

    // Labeling X Axis
    xLabel
      .append("text")
      .attr(
        "transform",
        "translate(" +
          this.width / 2 +
          " ," +
          (this.height + this.margin - 30) +
          ")"
      )
      .style("text-anchor", "middle")
      .text(this.xColName + " (€)");

    const yLabel = this.svg.append("g");

    // Labeling Y Axis
    yLabel
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - this.margin)
      .attr("x", 0 - this.height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(this.yColName);

    const d3Legend = this.svg.append("g");

    let index = 0;
    let offset = 20;

    // Draw legend
    for (const oKey in carTypeColors) {
      let color = carTypeColors[oKey];
      index++;

      let lastWidthAndLastMarginInBetween = 100;

      d3Legend
        .append("text")
        .attr(
          "transform",
          "translate(" +
            (this.width + lastWidthAndLastMarginInBetween) +
            " ," +
            (200 - index * offset) +
            ")"
        )
        .style("text-anchor", "end")
        .text(oKey);

      d3Legend
        .append("circle")
        .attr("cx", this.width + lastWidthAndLastMarginInBetween + 15)
        .attr("cy", 200 - index * offset - 5)
        .attr("r", 6)
        .style("opacity", 0.7)
        .style("fill", color);
    }
    
    index += 1;

    for (const oKey in carWDShapes) {
      let shape = carWDShapes[oKey];
      index++;

      let lastWidthAndLastMarginInBetween = 100;
      d3Legend
        .append("text")
        .attr(
          "transform",
          "translate(" +
            (this.width + lastWidthAndLastMarginInBetween) +
            " ," +
            (200 - index * offset) +
            ")"
        )
        .style("text-anchor", "end")
        .text(oKey);

      switch (shape) {
        
        case "rect": {
          d3Legend
            .append("rect")
            .attr("x", this.width + lastWidthAndLastMarginInBetween + 8)
            .attr("y", 200 - index * offset - 12)
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", "none")
            .attr("stroke-width", "3px")
            .attr("stroke", "#222");
          break;
        }

        case "filled rect": {
          d3Legend
            .append("rect")
            .attr("x", this.width + lastWidthAndLastMarginInBetween + 8)
            .attr("y", 200 - index * offset - 12)
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", "#222");
          break;
        }

        case "circle": {
          d3Legend
            .append("circle")
            .attr("cx", this.width + lastWidthAndLastMarginInBetween + 15)
            .attr("cy", 200 - index * offset - 5)
            .attr("r", 6)
            .attr("fill", "none")
            .attr("stroke-width", "3px")
            .attr("stroke", "#222");
          break;
        }
      }
    }
  }

  // Rounds up the second significant digit if digits thereafter are non-zero
  // can only round up values above 10.
  // e.g.: 0.81->0.81(<10) , 9.01->9.01(<10), 10.01->11 , 100->100, 101->110, 463->470, 192465->200000
  private roundAxisMaxValueUp(axisMax: number): number {
    let i = 0;
    let newAxisMax = axisMax;
    for (; newAxisMax > 10; i++) {
      newAxisMax /= 10;
    }
    if (i > 0) {
      newAxisMax = Math.ceil(newAxisMax * 10);
      for (; i > 1; i--) {
        newAxisMax *= 10;
      }
    }
    return newAxisMax;
  }
}
