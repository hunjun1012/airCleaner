import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffStatePage } from './off-state.page';

const routes: Routes = [
  {
    path: '',
    component: OffStatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffStatePageRoutingModule {}
