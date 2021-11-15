import { HttpClient } from '@angular/common/http';
import { Injectable,OnInit } from '@angular/core';
import { timeHours } from 'd3-time';
import { map, mapTo } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService{

  carsJsonArray=[];
  carJsonColumnNames=[];
  readCsvPromise: any;

  constructor(private http: HttpClient) {}

    getCSV(){
      if(!this.readCsvPromise){
        this.readCsvPromise = new Promise((resolve, reject) => {
          this.http.get('/assets/cars.csv',{responseType:'text'}).subscribe((data: any) => {
            this.carsJsonArray = this.CsvToJSON(data);
            this.carJsonColumnNames = Object.keys(this.carsJsonArray[0]);
            resolve(null);
          }, error => {
            reject(error);
          })
        })
      };
      return this.readCsvPromise;
    }

   CsvToJSON(csvData){
    var lines=csvData.split("\n");
    var jsonArray = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        jsonArray.push(obj);
    }
    return jsonArray;
  }

  bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  cards() {
    return [71, 78, 39, 66];
  }

  pieChart() {
    return [{
      name: 'Chrome',
      y: 61.41,
      sliced: true,
      selected: true
    }, {
      name: 'Internet Explorer',
      y: 11.84
    }, {
      name: 'Firefox',
      y: 10.85
    }, {
      name: 'Edge',
      y: 4.67
    }, {
      name: 'Safari',
      y: 4.18
    }, {
      name: 'Sogou Explorer',
      y: 1.64
    }, {
      name: 'Opera',
      y: 1.6
    }, {
      name: 'QQ',
      y: 1.2
    }, {
      name: 'Other',
      y: 2.61
    }];
  }
}
