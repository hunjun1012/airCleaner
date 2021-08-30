import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DustChartPage } from './dust-chart.page';

const routes: Routes = [
  {
    path: ':deviceId',
    component: DustChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DustChartPageRoutingModule {}
