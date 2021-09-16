import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullScreenLayoutComponent } from './layout/full-screen-layout/full-screen-layout.component';
import { MyDashboardComponent } from './modules/my-dashboard/my-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: FullScreenLayoutComponent,
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
