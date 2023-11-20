import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultComponent } from "./layouts/default/default.component";
import { AboutusComponent } from "./modules/aboutus/aboutus.component";
import { Assignment3Component } from "./modules/assignment3/assignment3.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DefaultComponent, // Header, Sidebar, Replaceable Body via Router Outlet, Footer Plugged
    children: [
      {
        path: "",
        component: DashboardComponent, // Assignment 2 Body Content
      },
      {
        path: "multivariate-data-visual",
        component: DashboardComponent, // Assignment 2 Body Content
      },
      {
        path: "us-airport-traffic", // Assignment 2 Body Content
        component: Assignment3Component,
      },
      {
        path: "aboutus", // About Us Body Content
        component: AboutusComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
