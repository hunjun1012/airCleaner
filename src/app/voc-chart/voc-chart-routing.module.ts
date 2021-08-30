import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocChartPage } from './voc-chart.page';

const routes: Routes = [
  {
    path: ':deviceId',
    component: VocChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocChartPageRoutingModule {}
