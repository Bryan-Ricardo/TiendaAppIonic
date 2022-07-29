import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerVentasPage } from './ver-ventas.page';

const routes: Routes = [
  {
    path: '',
    component: VerVentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerVentasPageRoutingModule {}
