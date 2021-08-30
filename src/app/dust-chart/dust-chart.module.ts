import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DustChartPageRoutingModule } from './dust-chart-routing.module';

import { DustChartPage } from './dust-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DustChartPageRoutingModule
  ],
  declarations: [DustChartPage]
})
export class DustChartPageModule {}
