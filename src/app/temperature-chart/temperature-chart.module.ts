import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemperatureChartPageRoutingModule } from './temperature-chart-routing.module';

import { TemperatureChartPage } from './temperature-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemperatureChartPageRoutingModule
  ],
  declarations: [TemperatureChartPage]
})
export class TemperatureChartPageModule {}
