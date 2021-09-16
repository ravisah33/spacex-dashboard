import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashLayoutComponent } from './layout/dash-layout/dash-layout.component';
import { MyDashboardComponent } from './modules/my-dashboard/my-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: MyDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
