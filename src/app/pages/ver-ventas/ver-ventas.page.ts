import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { GetApiService } from 'src/app/services/get-api.service';

@Component({
  selector: 'app-ver-ventas',
  templateUrl: './ver-ventas.page.html',
  styleUrls: ['./ver-ventas.page.scss'],
})
export class VerVentasPage implements OnInit {

  id = this.activatedRoute.snapshot.paramMap.get("id");
  productos: any[] = [];
  totalFacturar: number=0;
  venta = {}
  productosVenta: any[] = []
  url = 'https://api-rest-articulos.herokuapp.com/api/articulos/imagen/';

  constructor(private activatedRoute: ActivatedRoute,public _services: GetApiService,private menuCtrl: MenuController) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);
    this._services.getVentaData<any[]>(this.id).subscribe((data) => {
      this.productos = data;
      this.agregarObjetoImportante(data);
    });
  }

  ngOnInit() {

  }


  agregarObjetoImportante(data){
    for(let i =0; i<data.venta.length; i++){
      if(data.venta[i]._id === this.id){
        console.log(data.venta[i]);
        this.venta = {...data.venta[i]};
        this.inicializarValor(data.venta[i].total,data.venta[i].productos.carrito);
      }
    }
    console.log( "Producto: ", this.venta);
    
  }

  inicializarValor(total,arreglo){
    this.totalFacturar = total
    this.productosVenta = arreglo;
  }
  mostrarMenu() {
    this.menuCtrl.open('first');
  }


}
