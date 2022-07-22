import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { GetApiService } from 'src/app/services/get-api.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  articulos='';
  productos: any[] =[];
  productosOriginales: any[] = [];
  textoBuscar: string = '';
  url = 'https://api-rest-articulos.herokuapp.com/api/articulos/imagen/';

  constructor(public _services: GetApiService,private menuCtrl: MenuController,private alertCtrl: AlertController) { 
    this._services.getData<any[]>("").subscribe(data=>{
      this.productos = data;
      this.productosOriginales = data;
      console.log(this.productos);
      }
    )
  }

  ngOnInit() {

  }

  onSearchChange(evento){
    this.textoBuscar = evento.detail.value
  }

  mostrarMenu(){
    this.menuCtrl.open('first');
  }

  async eliminarProducto(idP){    
    
    await this._services.deleteData(idP).subscribe( 
      response => {
                    console.log("Respuesta :" , response);
                    this.mensajeEliminado();
                    window.location.assign('/');
                  },
     error => {
                    this.mensajeFallo();
                    console.log(error.text());
    });
  }

  async menuEliminar(idP,nombreP,cantidadP,precioP,imgP){
    const alert = await this.alertCtrl.create({
      cssClass: 'alerta',
      header : 'Eliminar Producto',
      message: '¿Seguro quieres eliminar el producto?',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          handler: ()=>{
            console.log('click en cancelar');
          } 
        },
        {
          text: 'Si',
          cssClass: 'textoSi',
          handler: ()=>{
              this.eliminarProducto(idP);
          } 
        },
      ],
    })
    await alert.present();
  }

  async mensajeEliminado(){
    const alert = document.createElement('ion-alert');
    alert.header = 'ELIMINADO';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  async mensajeFallo(){
    const alert = document.createElement('ion-alert');
    alert.header = 'FALLO LA ELIMINACION';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  async refrescarDatos(evento){
    console.log(evento);
     evento.target.complete( await this._services.getData<any[]>("").subscribe(data=>{
        this.productos = data;
        this.productosOriginales = data;
        console.log(this.productos);
        }
      )
    )
  }

}