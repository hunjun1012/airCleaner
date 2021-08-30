import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterChartPage } from './filter-chart.page';

const routes: Routes = [
  {
    path: ':deviceId',
    component: FilterChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterChartPageRoutingModule {}
