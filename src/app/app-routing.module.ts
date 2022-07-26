import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'sin-productos',
    loadChildren: () => import('./pages/sin-productos/sin-productos.module').then( m => m.SinProductosPageModule)
  },
  {
    path: 'ver/:nombre/:img/:cantidad/:precio',
    loadChildren: () => import('./pages/ver/ver.module').then( m => m.VerPageModule)
  },
  {
    path: 'editar/:id/:nombre/:img/:cantidad/:precio',
    loadChildren: () => import('./pages/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then( m => m.VentasPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'ver-ventas/:id',
    loadChildren: () => import('./pages/ver-ventas/ver-ventas.module').then( m => m.VerVentasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
