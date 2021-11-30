import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { DashboardService } from '../../../modules/dashboard/dashboard.service';
import { MatTableDataSource, MatPaginator , MatSort} from '@angular/material';

@Component({
  selector: 'app-multivariate-data',
  templateUrl: './multivariate-data.component.html',
  styleUrls: ['./multivariate-data.component.scss']
})
export class MultivariateDataComponent implements OnInit {

  displayedColumns=[];
  carsJsonArray=[];
  dataSource= new MatTableDataSource<any>();
  @Input() searchText:string;

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit() {
  }


}
