import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import { DashboardComponent } from "src/app/modules/dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import {
  MatSidenavModule,
  MatDividerModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DashboardService } from "src/app/modules/dashboard.service";
import { Assignment3Component } from "src/app/modules/assignment3/assignment3.component";
import { AboutusComponent } from "src/app/modules/aboutus/aboutus.component";
import { PerfectScrollbarConfigInterface , PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    Assignment3Component,
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
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    PerfectScrollbarModule
  ],
  providers: [DashboardService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DefaultModule {}
