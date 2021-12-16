import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "src/app/shared/common-service/common.service";

@Injectable({
  providedIn: "root",
})
export class Assignment3Service {
  
  flightPromise: any;
  airportsPromise: any;
  usStatePromise: any;

  public flightColNames = [];
  public flightJsonArrays = [];

  public airportColNames = [];
  public airportJsonArrays = [];

  public usStateJson: any;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  getFlightCSV() {
    if (!this.flightPromise) {
      this.flightPromise = new Promise((resolve, reject) => {
        this.http
          .get("/assets/flights-airport-5000plus.csv", { responseType: "text" })
          .subscribe(
            (data: any) => {
              this.flightJsonArrays = this.commonService.CsvToJSON(data);
              this.flightColNames = Object.keys(this.flightJsonArrays[0]);
              resolve(null);
            },
            (error) => {
              reject(error);
            }
          );
      });
    }
    return this.flightPromise;
  }

  getAirportCSV() {
    if (!this.airportsPromise) {
      this.airportsPromise = new Promise((resolve, reject) => {
        this.http
          .get("/assets/airports.csv", { responseType: "text" })
          .subscribe(
            (data: any) => {
              this.airportJsonArrays = this.commonService.CsvToJSON(data);
              this.airportColNames = Object.keys(this.airportJsonArrays[0]);
              resolve(null);
            },
            (error) => {
              reject(error);
            }
          );
      });
    }
    return this.airportsPromise;
  }

  getUsState10m() {
    if (!this.usStatePromise) {
      this.usStatePromise = new Promise((resolve, reject) => {
        this.http
          .get("/assets/states-10m.json", { responseType: "json" })
          .subscribe(
            (data: any) => {
              this.usStateJson = data;
              resolve(null);
            },
            (error) => {
              reject(error);
            }
          );
      });
    }
    return this.usStatePromise;
  }
}
