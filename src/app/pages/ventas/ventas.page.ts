import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { GetApiService } from 'src/app/services/get-api.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {

  productos: any[] = [];

  constructor( public _services: GetApiService,
    private menuCtrl: MenuController,private alertCtrl: AlertController) { 
    this._services.getVentaData<any[]>('').subscribe((data) => {
      this.productos = data;
      console.log(this.productos);
    });
  }

  ngOnInit() {
  }
  
  async refrescarDatos(evento) {
    console.log(evento);
    evento.target.complete(
      this._services.getVentaData<any[]>('').subscribe((data) => {
        this.productos = data;
        console.log(this.productos);
      })
    );
  }

  mostrarMenu() {
    this.menuCtrl.open('first');
  }

  async eliminarVenta(idP){
    await this._services.deleteVentaData(idP).subscribe(
      (response) => {
        console.log('Respuesta :', response);
        this.mensajeEliminado();
        window.location.assign('/ventas');
      },
      (error) => {
        this.mensajeFallo();
        console.log(error.text());
      }
    );
  }

  async menuEliminar(idP) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alerta',
      header: 'Eliminar Producto',
      message: '¿Seguro quieres eliminar el registro de la venta?',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log('click en cancelar');
          },
        },
        {
          text: 'Si',
          cssClass: 'textoSi',
          handler: () => {
            this.eliminarVenta(idP);
          },
        },
      ],
    });
    await alert.present();
  }

  async mensajeEliminado() {
    const alert = document.createElement('ion-alert');
    alert.header = 'ELIMINADO';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  async mensajeFallo() {
    const alert = document.createElement('ion-alert');
    alert.header = 'FALLO LA ELIMINACION';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

}