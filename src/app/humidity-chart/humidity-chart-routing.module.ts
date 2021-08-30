import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HumidityChartPage } from './humidity-chart.page';

const routes: Routes = [
  {
    path: ':deviceId',
    component: HumidityChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumidityChartPageRoutingModule {}
