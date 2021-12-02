import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

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

  public getMax(jsonArray, colName){
    let maxValue = -2147483647;

    if(jsonArray){
      jsonArray.forEach(item=>{
        if(parseInt(item[colName])>maxValue)
          maxValue=parseInt(item[colName]);
      })
    }
    return maxValue;
  }

  public getMin(jsonArray, colName){
    let minValue = 2147483647;
    if(jsonArray){
      jsonArray.forEach(item=>{
        if(parseInt(item[colName])<minValue)
          minValue=parseInt(item[colName]);
      })
    }
    return minValue;
  }

}
