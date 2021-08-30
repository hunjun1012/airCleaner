import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocChartPageRoutingModule } from './voc-chart-routing.module';

import { VocChartPage } from './voc-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VocChartPageRoutingModule
  ],
  declarations: [VocChartPage]
})
export class VocChartPageModule {}
