import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { GetApiService } from 'src/app/services/get-api.service';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  articulos = '';
  productos: any[] = [];
  productosOriginales: any[] = [];
  textoBuscar: string = '';
  url = 'https://api-rest-articulos.herokuapp.com/api/articulos/imagen/';
  cantVenta: number = 1;
  total: number = 1;
  precio: number = 1;

  productosCarrito: any[] = [];

  constructor(
    public _services: GetApiService,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController
  ) {
    this._services.getData<any[]>('').subscribe((data) => {
      this.productos = data;
      console.log(this.productos);
    });
    this._services.getCarritoData<any[]>('').subscribe((data) => {
      this.productosCarrito = data;
      console.log(this.productosCarrito);
    });
  }
  /*INICIO */

  ngOnInit() {}
  /*FINAL */
  onSearchChange(evento) {
    this.textoBuscar = evento.detail.value;
  }

  mostrarMenu() {
    this.menuCtrl.open('first');
  }

  async eliminarProducto(idP) {
    await this._services.deleteData(idP).subscribe(
      (response) => {
        console.log('Respuesta :', response);
        this.mensajeEliminado();
        window.location.assign('/');
      },
      (error) => {
        this.mensajeFallo();
        console.log(error.text());
      }
    );
  }

  async menuEliminar(idP, nombreP, cantidadP, precioP, imgP) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alerta',
      header: 'Eliminar Producto',
      message: '¿Seguro quieres eliminar el producto?',
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
            this.eliminarProducto(idP);
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

  async refrescarDatos(evento) {
    console.log(evento);
    evento.target.complete(
      await this._services.getData<any[]>('').subscribe((data) => {
        this.productos = data;
        this.productosOriginales = data;
        console.log(this.productos);
      })
    );
  }

  /*Ventas */
  agregarVenta(cantMax) {
    if (this.cantVenta < cantMax) {
      this.cantVenta++;
      this.total = this.precio * this.cantVenta;
    }
  }

  restarVenta() {
    if (this.cantVenta > 1) {
      this.cantVenta--;
      this.total = this.precio * this.cantVenta;
    }
  }

  reiniciarValor(precio) {
    this.cantVenta = 1;
    this.total = precio;
    this.precio = precio;
  }

  async vender(nombre, img, cantidad, productosCarrito,precio) {
    let enviarDatos = true;
    console.log(cantidad - this.cantVenta);
    let cantidadFinal = cantidad - this.cantVenta;
    let longitudCarrito = productosCarrito.carrito.length;

    for(let i=0; i<longitudCarrito;i++){
      if(productosCarrito.carrito[i].nombre === nombre){
        enviarDatos=false;
      }
    }

    if (enviarDatos) {
      let objeto = {
        nombre: nombre,
        img: img,
        precio: precio,
        precioTotal: this.total,
        cantidad: this.cantVenta,
        cantidadMax: cantidad,
        descripcion: 'vender',
      };

      await this._services.postCarritoData(objeto).subscribe(
        (response) => {
          console.log('Respuesta :', response);
          window.location.assign('/');
          this.mensajeAgregadoCarrito();
        },
        (error) => {
          this.mensajeFalloCarrito();
          console.log(error.text());
        }
      );
    } else {
      this.mensajeFalloRepetidoCarrito();
    }
  }

  async mensajeAgregadoCarrito() {
    const alert = document.createElement('ion-alert');
    alert.header = 'AGREGADO AL CARRITO';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  async mensajeFalloCarrito() {
    const alert = document.createElement('ion-alert');
    alert.header = 'FALLO AL AGREGAR EL PRODUCTO';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  async mensajeFalloRepetidoCarrito() {
    const alert = document.createElement('ion-alert');
    alert.header = 'EL PRODUCTO YA SE ENCUENTRA AGREGADO';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }
}
