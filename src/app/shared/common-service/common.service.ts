import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  CsvToJSON(csvData) {
    let lines = csvData.split("\n");
    let jsonArray = [];
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(",");
      let notEmptyCount = 0;
      for (let j = 0; j < headers.length; j++) {
        let header = headers[j];
        header = header.trim();
        let word = currentline[j];
        if (!word || word.trim() == '') notEmptyCount++; // Removing empty line
        obj[header] = currentline[j];
      }

      if (notEmptyCount != headers.length)
        jsonArray.push(obj);
    }
    return jsonArray;
  }

  public getMax(jsonArray, colName) {
    let maxValue = -2147483647;
    if (jsonArray) {
      jsonArray.forEach(item => {
        if (parseInt(item[colName]) > maxValue)
          maxValue = parseInt(item[colName]);
      })
    }
    return maxValue;
  }

  public getMin(jsonArray, colName) {
    let minValue = 2147483647;
    if (jsonArray) {
      jsonArray.forEach(item => {
        if (parseInt(item[colName]) < minValue)
          minValue = parseInt(item[colName]);
      })
    }
    return minValue;
  }

  public getGetUniqueColors(carArr) {
    let colors = {};
    carArr.forEach(car => {
      if (!colors[car['Type']]) {
        colors[car['Type']] = '#' + Math.floor(Math.random() * 16777215).toString(16);
      }
    })
    return colors;
  }

  public getInOutDegreeOfFlights(flightData) {

    const flights = {};
    let maxIncoming = -2147483647;
    let maxOutgoing = -2147483647;

    flightData.forEach(d => {

      let destinationInDegree = `${d.destination}-in`;
      let originOutDegree = `${d.origin}-out`;

      if (!flights[destinationInDegree])
        flights[destinationInDegree] = 0;

      if (!flights[originOutDegree])
        flights[originOutDegree] = 0;

      try {
        flights[destinationInDegree] += parseInt(d.count);
      } catch (err) { }

      try {
        flights[originOutDegree] += parseInt(d.count);
      } catch (err) { }

      if (maxIncoming < flights[destinationInDegree]) {
        maxIncoming = flights[destinationInDegree];
      }

      if (maxOutgoing < flights[originOutDegree]) {
        maxOutgoing = flights[originOutDegree];
      }

    });

    flights['maxIncoming'] = maxIncoming;
    flights['maxOutgoing'] = maxOutgoing;

    return flights;
  }
}
