import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator , MatSort} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns=[];
  carsJsonArray=[];
  dataSource: any;

  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getCSV().then(() => {
      this.displayedColumns=this.dashboardService.carJsonColumnNames;
      this.carsJsonArray=this.dashboardService.carsJsonArray;
      this.dataSource = new MatTableDataSource<any>(this.dashboardService.carsJsonArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
    }) 
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit() {
  }

}
