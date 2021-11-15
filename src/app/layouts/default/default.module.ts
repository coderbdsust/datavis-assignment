import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonModule,MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { Assignment2Component } from 'src/app/modules/assignment2/assignment2.component';
import { AboutusComponent } from 'src/app/modules/aboutus/aboutus.component';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    Assignment2Component,
    AboutusComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    DataTablesModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
