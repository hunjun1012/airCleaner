import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffStatePageRoutingModule } from './off-state-routing.module';

import { OffStatePage } from './off-state.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffStatePageRoutingModule
  ],
  declarations: [OffStatePage]
})
export class OffStatePageModule {}
