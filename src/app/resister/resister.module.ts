import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResisterPageRoutingModule } from './resister-routing.module';

import { ResisterPage } from './resister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResisterPageRoutingModule
  ],
  declarations: [ResisterPage]
})
export class ResisterPageModule {}
