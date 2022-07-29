import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { GetApiService } from 'src/app/services/get-api.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  articulos = '';
  productos: any[] = [];
  productosOriginales: any[] = [];
  textoBuscar: string = '';
  url = 'https://api-rest-articulos.herokuapp.com/api/articulos/imagen/';
  cantVenta: number = 1;
  total: number = 1;
  precio: number = 1;

  totalFacturar = 0;

  constructor(
    public _services: GetApiService,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController
  ) {
    this._services.getCarritoData<any[]>('').subscribe((data) => {
      this.productos = data;
      console.log(this.productos);
      this.actualizarTotal(data);
    });
  }
  /*INICIO */

  ngOnInit() {}
  /*FINAL */

  /*Ventas */

  async agregarVenta(producto) {
    if (producto.cantidad <= producto.cantidadMax) {
      let cantidadEnviar = producto.cantidad + 1;
      let precioTotalEnviar = cantidadEnviar * producto.precio;
      let objeto = {
        cantidad: cantidadEnviar,
        precioTotal: precioTotalEnviar,
      };

      await this._services.putCarritoData(producto._id, objeto).subscribe(
        (response) => {
          console.log('Respuesta :', response);
          window.location.assign('/carrito');
        },
        (error) => {
          this.mensajeFallo();
          console.log(error.text());
        }
      );
    }
  }

  async restarVenta(producto) {
    if (producto.cantidad > 1) {
      let cantidadEnviar = producto.cantidad - 1;
      let objeto = {
        cantidad: cantidadEnviar,
      };

      await this._services.putCarritoData(producto._id, objeto).subscribe(
        (response) => {
          console.log('Respuesta :', response);
          window.location.assign('/carrito');
        },
        (error) => {
          this.mensajeFallo();
          console.log(error.text());
        }
      );
    }
  }

  reiniciarValor(precio) {
    this.cantVenta = 1;
    this.total = precio;
    this.precio = precio;
  }

  async vender(nombre, img, cantidad, productosCarrito) {
    let enviarDatos = true;
    console.log(cantidad - this.cantVenta);
    let cantidadFinal = cantidad - this.cantVenta;
    let longitudCarrito = productosCarrito.carrito.length;

    for (let i = 0; i < longitudCarrito; i++) {
      if (productosCarrito.carrito[i].nombre === nombre) {
        enviarDatos = false;
      }
    }

    if (enviarDatos) {
      let objeto = {
        nombre: nombre,
        img: img,
        precio: this.total,
        cantidad: cantidadFinal,
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

  /*AGREGADO */
  onSearchChange(evento) {
    this.textoBuscar = evento.detail.value;
  }

  mostrarMenu() {
    this.menuCtrl.open('first');
  }

  async eliminarProducto(idP) {
    await this._services.deleteCarritoData(idP).subscribe(
      (response) => {
        console.log('Respuesta :', response);
        this.mensajeEliminado();
        window.location.assign('/carrito');
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
      await this._services.getCarritoData<any[]>('').subscribe((data) => {
        this.productos = data;
        this.productosOriginales = data;
        console.log(this.productos);
      })
    );
  }

  actualizarTotal(cantidadAumentar) {
    let cantidarDatos = cantidadAumentar.carrito.length;

    for (let i = 0; i < cantidarDatos; i++) {
      this.totalFacturar += cantidadAumentar.carrito[i].precioTotal;
    }

    console.log('TOTAL: ', this.totalFacturar, cantidarDatos);
    return true;
  }

  async enviarVenta(productos) {
    let nada =0
    if(productos.carrito.length === 0){
      this.mensajeFalloSinProductos();
    }else{

    
    console.log(productos);
    let fecha = new Date();
    let fechaFormateada =
      fecha.getDate() +
      '/' +
      (fecha.getMonth() + 1) +
      '/' +
      fecha.getFullYear();
    let hora = fecha.getHours() + ':' + fecha.getMinutes();

    console.log(fechaFormateada, ' ', hora);
    let objeto = {
      fechaCompleta: fechaFormateada + '-' +hora,
      fecha: fechaFormateada,
      hora: hora,
      total: this.totalFacturar,
      productos: productos,
    };

    await this._services.postVentaData(objeto).subscribe(
      (response) => {
        console.log('Respuesta :', response);
        window.location.assign('/ventas');
        this.mensajeVendido();
      },
      (error) => {
        this.mensajeFalloVendido();
        console.log(error.text());
      }
    );

    for (let i = 0; i < productos.carrito.length; i++) {
      await this._services
        .deleteCarritoData(productos.carrito[i]._id)
        .subscribe(
          (response) => {
            
          },
          (error) => {
            this.mensajeFalloVendido();
            console.log(error.text());
          }
        );
    }
    }
  }

  async operacionesEnviar(objeto,productos){
  }

  async mensajeVendido() {
    const alert = document.createElement('ion-alert');
    alert.header = 'VENDIDO';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  async mensajeFalloVendido() {
    const alert = document.createElement('ion-alert');
    alert.header = 'FALLO LA VENTA';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  async mensajeFalloSinProductos() {
    const alert = document.createElement('ion-alert');
    alert.header = 'NO HAY PRODUCTOS EN EL CARRITO';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

}
