import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatDividerModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AreaComponent } from "./widgets/area/area.component";
import { HighchartsChartModule } from "highcharts-angular";
import { CardComponent } from "./widgets/card/card.component";
import { PieComponent } from "./widgets/pie/pie.component";
import { ScaterplotComponent } from "./widgets/scaterplot/scaterplot.component";
import { StarplotComponent } from "./widgets/starplot/starplot.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    ScaterplotComponent,
    StarplotComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    ScaterplotComponent,
    StarplotComponent,
  ],
})
export class SharedModule {}
