import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperatureChartPage } from './temperature-chart.page';

const routes: Routes = [
  {
    path: ':deviceId',
    component: TemperatureChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperatureChartPageRoutingModule {}
