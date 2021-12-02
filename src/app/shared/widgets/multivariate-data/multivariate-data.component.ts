import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator , MatSort} from '@angular/material';

@Component({
  selector: 'app-multivariate-data',
  templateUrl: './multivariate-data.component.html',
  styleUrls: ['./multivariate-data.component.scss']
})
export class MultivariateDataComponent implements OnInit, OnChanges {

  
  // Receiving attributes data from parent component - start
  @Input("tableTitle")
  public tableTitle = "Multivariate Data Sample";

  @Input("displayColNames")
  public displayedColumns=[];

  @Input("displayDataArrays")
  public dataJsonArray=[];
  // Receiving attributes data from parent component - End

  @Input() searchText:string;
  
  dataSource= new MatTableDataSource<any>();
  
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit() {}

  initializeMaterialTable(){
    this.dataSource.data = this.dataJsonArray;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  // When @Input() params get the values successfully, than re-render the material table
  ngOnChanges(changes: any) {
    this.initializeMaterialTable();
  }

}
