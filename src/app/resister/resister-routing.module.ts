import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResisterPage } from './resister.page';

const routes: Routes = [
  {
    path: '',
    component: ResisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResisterPageRoutingModule {}
