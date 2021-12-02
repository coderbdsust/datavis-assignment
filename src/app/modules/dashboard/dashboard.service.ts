import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/common-service/common.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService{

  carsJsonArray=[];
  carJsonColumnNames=[];
  readCsvPromise: any;

  constructor(private http: HttpClient, private commonService: CommonService) {}
    getCSV(){
      if(!this.readCsvPromise){
        this.readCsvPromise = new Promise((resolve, reject) => {
          this.http.get('/assets/cars.csv',{responseType:'text'}).subscribe((data: any) => {
            this.carsJsonArray = this.commonService.CsvToJSON(data);
            this.carJsonColumnNames = Object.keys(this.carsJsonArray[0]);
            resolve(null);
          }, error => {
            reject(error);
          })
        })
      };
      return this.readCsvPromise;
    }
}
