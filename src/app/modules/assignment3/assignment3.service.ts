import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "src/app/shared/common-service/common.service";

@Injectable({
  providedIn: "root",
})
export class Assignment3Service {
  
  flightPromise: any;
  airportsPromise: any;

  flightColNames = [];
  flightJsonArrays = [];

  airportsColNames = [];
  airportsJsonArrays = [];

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

  getAirportsCSV() {
    if (!this.airportsPromise) {
      this.flightPromise = new Promise((resolve, reject) => {
        this.http
          .get("/assets/airports.csv", { responseType: "text" })
          .subscribe(
            (data: any) => {
              this.airportsJsonArrays = this.commonService.CsvToJSON(data);
              this.airportsColNames = Object.keys(this.airportsJsonArrays[0]);
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
}
