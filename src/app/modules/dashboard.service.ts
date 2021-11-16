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

}
