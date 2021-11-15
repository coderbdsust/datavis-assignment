import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AboutusComponent } from './modules/aboutus/aboutus.component';
import { Assignment2Component } from './modules/assignment2/assignment2.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
        path: '',
        component: DashboardComponent
      },
      {
        path: 'assignment2',
        component: Assignment2Component
      },
      {
        path: 'aboutus',
        component: AboutusComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
