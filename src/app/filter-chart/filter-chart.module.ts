import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterChartPageRoutingModule } from './filter-chart-routing.module';

import { FilterChartPage } from './filter-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterChartPageRoutingModule
  ],
  declarations: [FilterChartPage]
})
export class FilterChartPageModule {}
