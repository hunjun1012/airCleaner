import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WifiPageRoutingModule } from './wifi-routing.module';

import { WifiPage } from './wifi.page';

import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WifiPageRoutingModule
  ],
  declarations: [WifiPage
    ],
    providers:[HTTP]
})
export class WifiPageModule {}
