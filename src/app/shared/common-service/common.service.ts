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
        let notEmptyCount=0;
        for(var j=0;j<headers.length;j++){
          let word = currentline[j];
          if(!word || word.trim()=='') notEmptyCount++; // Removing empty line
          obj[headers[j]] = currentline[j];
        }

        if(notEmptyCount!=headers.length)
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
  
  public getGetUniqueColors(carArr){
    let colors={};
    carArr.forEach(car => {
      if(!colors[car['Type']]){
          colors[car['Type']]= '#'+Math.floor(Math.random()*16777215).toString(16);
      }
    })
    return colors;
  }

}
