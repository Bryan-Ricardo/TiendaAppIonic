import { Component, OnInit ,Input} from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, MenuController } from '@ionic/angular';
import { GetApiService } from 'src/app/services/get-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{


  @Input() opcion: string = '0';
  @Input() titulo: string = '';
  @Input() diseno: string = ''; 
  @Input() disenoIcono: string = ''; 
  @Input() disenoGuardar: string = ''; 
  @Input() icono: string = '';
  @Input() nombre: string = '';
  @Input() cantidad: number = 0;
  @Input() precio: number = 0;
  @Input() imagen: string = '';
  @Input() id: string = '';

  constructor(private menuCtrl: MenuController,private alertCtrl: AlertController,public _services: GetApiService,private loadingController : LoadingController) { 
  

  }

  mostrarMenu(){
    this.menuCtrl.open('first');
  }
  async menuGuardar(){
    const alert = await this.alertCtrl.create({
      cssClass: 'alerta',
      header : 'Guardar Cambios',
      message: '¿Seguro quieres guardar los cambios realizados?',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          handler: ()=>{
            console.log('click en cancelar');
            console.log(this.opcion);
            
          } 
        },
        {
          text: 'Si',
          cssClass: 'textoSi',
          handler: ()=>{
            
              this.validandoDatos(this.opcion);
          } 
        },
      ],
    })
    await alert.present();
  }
  validandoDatos(eleccion){
    if(this.nombre === ''){
      this.mensajeError('No ingresaste un nombre valido');
    }else if(this.cantidad <0){
      this.mensajeError('No ingresaste una cantidad valida');
    }else if(this.precio <= 0){  
      this.mensajeError('No ingresaste un precio valido');
    }else if(eleccion === '1'){
      this.guardar();
    }else if(eleccion ==='2'){
      this.enviarDatos();
    }
  }

  async mensajeError(mensaje){
    const alert = await this.alertCtrl.create({
      cssClass: 'alerta',
      header : 'ERROR',
      message: mensaje,
      buttons: [
        {
          text: 'Ok',
          cssClass: 'textoSi',
        },
      ],
    })
    await alert.present();
  }


  async guardar(){

    let objeto = {
      nombre: this.nombre,
      cantidad: this.cantidad,
      precio: this.precio
    } 
    console.log("Cantidad",this.cantidad);
    console.log(this.nombre)
    
    await this._services.putData(this.id,objeto).subscribe( 
      response => {
                    console.log("Respuesta :" , response);
                    this.mensajeGuardado();
                    window.location.assign('/');
                  },
     error => {
                    this.mensajeFallo();
                    console.log(error.text());
    });
  }

  async cargando(){
    const loading = await this.loadingController.create({
      message: 'Guardando...',
      cssClass: 'custom-loading',
      duration: 5000
    });
    
    loading.present();
  }

  async mensajeGuardado(){
    const alert = document.createElement('ion-alert');
    alert.header = 'GUARDADO';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  async mensajeFallo(){
    const alert = document.createElement('ion-alert');
    alert.header = 'FALLO LA ACTUALIZACION';
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  async enviarDatos(){

    let objeto = {
      nombre: this.nombre,
      cantidad:this.cantidad.toString(),
      precio: this.precio.toString(),
      img: this.generarNombreImagen(this.nombre) ,
      descripcion: 'Creado'
    }
    
    await this._services.postData(objeto).subscribe( 
      response => {
                    console.log("Respuesta :" , response);
                    this.mensajeGuardado();
                    window.location.assign('/');
                  },
     error => {
                    this.mensajeFallo();
                    console.log(error.text());
    });

  }

  generarNombreImagen(nombre){
    nombre = nombre.replace(/ /g,"");
    nombre = nombre.toLowerCase();
    nombre+='.png';
    console.log(nombre);
    return nombre;
  }

}
