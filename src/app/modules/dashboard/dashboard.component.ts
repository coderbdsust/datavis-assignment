import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //Sendable Attributes to Child Component  - Start
  public multiDataArray = [];
  public multiDataCols = [];
  public multiTableTitle="Multivariate Data Sample";
  //Sendable Attributes to Child Component  - End

  constructor(private dashboardService:DashboardService) {
    this.dashboardService.getCSV().then(() => {
      this.multiDataCols = this.dashboardService.carJsonColumnNames;
      this.multiDataArray = this.dashboardService.carsJsonArray;
    }); 
  }

  ngOnInit() {}

}
