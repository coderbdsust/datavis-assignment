import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";
import { CommonService } from "../../common-service/common.service";
import { Assignment3Service } from "src/app/modules/assignment3/assignment3.service";
import * as topojson from "topojson-client";

@Component({
  selector: "app-heatmap",
  templateUrl: "./heatmap.component.html",
  styleUrls: ["./heatmap.component.scss"],
})
export class HeatmapComponent implements OnInit {
  private svg: any;
  private margin = 80;
  private marginBottom = 120;
  private width = 1100 - this.margin;
  private height = 600 - this.margin * 2;
  private plotName =
    "Figure - Interactive Visualization on Heatmap Based Layout";
  private usStateJson: any;
  private flightData = [];
  private airportsData = [];
  private inOutDegreeCntForFlight = {};

  constructor(
    private a3Service: Assignment3Service,
    private commonService: CommonService
  ) {}

  async ngOnInit() {
    await this.a3Service.getUsState10m().then(() => {
      this.usStateJson = this.a3Service.usStateJson;
    });

    await this.a3Service.getAirportCSV().then(() => {
      this.airportsData = this.a3Service.airportJsonArrays;
    });

    await this.a3Service.getFlightCSV().then(() => {
      this.flightData = this.a3Service.flightJsonArrays;
      this.inOutDegreeCntForFlight = this.commonService.getInOutDegreeOfFlights(
        this.flightData
      );
    });

    this.renderPlot();
  }

  renderPlot() {
    this.createSvg();
    this.drawPlot();
    console.log("renderPlot");
  }

  // Creating Graph Window Size
  private createSvg(): void {
    this.svg = d3
      .select("figure#heatmap")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height + (this.margin + this.marginBottom));
  }

  // Drawing the graph in the area
  private drawPlot(): void {
    const projection = d3.geoAlbersUsa();
    const pathGenerator = d3.geoPath().projection(projection);
    const states = topojson.feature(
      this.usStateJson,
      this.usStateJson.objects.states
    );

    const g = this.svg.append("g");
    const inOutDeg = this.inOutDegreeCntForFlight;

    let Tooltip = d3
      .select("figure#heatmap")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("color","gray")
      .style("border-width", "2px")
      .style("padding", "5px");

    // Drawing the USA map
    g.selectAll("path")
      .data(states["features"])
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("stroke", "white")
      .attr("stroke-width", "3px")
      .attr("d", pathGenerator)
      .attr("fill", "rgba(211,211,211,0.9)")
      .on("mouseover", function (event, d)  {
        try{
          let state = d3.select(this);
          state.attr("fill", "rgba(144,238,144,1)");

        }catch(err){}
      }).on("mouseleave", function (event, d) {
        try{
          let state = d3.select(this);
          state.attr("fill", "rgba(211,211,211,0.9)");
        }catch(err){}
      });
      
    // Drawing the circle in the USA Map
    g.selectAll("path")
      .data(this.airportsData)
      .enter()
      .append("circle")
      .attr("transform", ({ longitude, latitude }) => {
        return `translate(${projection([longitude, latitude])})`;
      })
      .attr("r", (d) => {
        if (inOutDeg[d.iata + "-out"])
          return (inOutDeg[d.iata + "-out"] / inOutDeg["maxOutgoing"]) * 50;
        else if (inOutDeg[d.iata + "-in"])
          return (inOutDeg[d.iata + "-in"] / inOutDeg["maxIncoming"]) * 50;
        else {
          return 2;
        }
      })
      .style("opacity", 0.5)
      .style("fill", "red")
      .on("mousemove", (event, d) => {
        Tooltip.html(`Airport - ${d.iata}, Name - ${d.name}, City - ${d.city}, State - ${d.state}`);

      })
      .on("mouseover", function (event, d)  {
        Tooltip.style("opacity", 1);
        try{
          let circle = d3.select(this);
          circle
            .style("opacity", 0.7)
            .style("stroke","black")
            .style("stroke-width","3px")

        }catch(err){}
      }).on("mouseleave", function (event, d) {
        Tooltip.style("opacity", 0);
        try{
          let circle = d3.select(this);
          circle
            .style("opacity", 0.5)
            .style("stroke","none")
            .style("stroke-width","0px")
        }catch(err){}
      });
      
    // Labeling Plot
    g.append("text")
      .attr(
        "transform",
        "translate(" +
          (this.width / 2 - this.margin)+
          " ," +
          (this.height + this.marginBottom - 10) +
          ")"
      )
      .attr("font-weight", "bold")
      .style("text-anchor", "middle")
      .text(this.plotName);
  }
}
