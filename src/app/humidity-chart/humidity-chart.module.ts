import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HumidityChartPageRoutingModule } from './humidity-chart-routing.module';

import { HumidityChartPage } from './humidity-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HumidityChartPageRoutingModule
  ],
  declarations: [HumidityChartPage]
})
export class HumidityChartPageModule {}
