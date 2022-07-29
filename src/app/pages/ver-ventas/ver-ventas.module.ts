import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerVentasPageRoutingModule } from './ver-ventas-routing.module';

import { VerVentasPage } from './ver-ventas.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerVentasPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [VerVentasPage]
})
export class VerVentasPageModule {}
