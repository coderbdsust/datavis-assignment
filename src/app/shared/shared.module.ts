import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
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
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from "@angular/material";

import {FormsModule} from "@angular/forms";
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
import { ForceDirectedPlotComponent } from './widgets/force-directed-plot/force-directed-plot.component';
import { MultivariateDataComponent } from './widgets/multivariate-data/multivariate-data.component';
import { PerfectScrollbarConfigInterface , PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import { CommonService } from "./common-service/common.service";
import { HeatmapComponent } from './widgets/heatmap/heatmap.component';
import { DialogDataViewerComponent } from './widgets/dialog-data-viewer/dialog-data-viewer.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};

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
    ForceDirectedPlotComponent,
    MultivariateDataComponent,
    HeatmapComponent,
    DialogDataViewerComponent,
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
    MatFormFieldModule,
    FormsModule,
    PerfectScrollbarModule,
    MatDialogModule,
    MatDividerModule
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
    MultivariateDataComponent,
    ForceDirectedPlotComponent,
    HeatmapComponent,
    DialogDataViewerComponent
  ],
  providers: [
    CommonService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DialogDataViewerComponent]
})
export class SharedModule {}
