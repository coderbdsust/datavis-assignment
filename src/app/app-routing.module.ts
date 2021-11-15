import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AboutusComponent } from './modules/aboutus/aboutus.component';
import { Assignment3Component } from './modules/assignment3/assignment3.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
        path: '',
        component: DashboardComponent // Assignment 2
      },
      {
        path: 'assignment3',
        component: Assignment3Component
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
