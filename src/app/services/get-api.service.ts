import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor( public _http: HttpClient) { 

  }

  getData<T>(url: string){
    url = 'https://api-rest-articulos.herokuapp.com/api/articulos'
    return this._http.get<T[]>(url)
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  putData<T>(id:string,objeto:Object){
    let url = 'https://api-rest-articulos.herokuapp.com/api/articulos/';
    url+=id;
    console.log(url);
    let datosEnviar = JSON.stringify(objeto);
    console.log(datosEnviar);
    return this._http.put(url,datosEnviar,this.httpOptions);
  }


  postData<T>(objeto:Object){
    let url = 'https://api-rest-articulos.herokuapp.com/api/articulos';
    let datosEnviar = JSON.stringify(objeto);
    console.log(datosEnviar);
    return this._http.post(url,datosEnviar,this.httpOptions);
  }

  deleteData<T>(id:string){
    let url = 'https://api-rest-articulos.herokuapp.com/api/articulos/';
    url+=id;
    return this._http.delete(url);
  }

  /* Metodos del carrito*/

  getCarritoData<T>(url: string){
    url = 'https://api-rest-articulos.herokuapp.com/api/articulos/carrito'
    return this._http.get<T[]>(url)
  }

  putCarritoData<T>(id:string,objeto:Object){
    let url = 'https://api-rest-articulos.herokuapp.com/api/articulos/carrito/';
    url+=id;
    console.log(url);
    let datosEnviar = JSON.stringify(objeto);
    console.log(datosEnviar);
    return this._http.put(url,datosEnviar,this.httpOptions);
  }


  postCarritoData<T>(objeto:Object){
    let url = 'https://api-rest-articulos.herokuapp.com/api/articulos/carrito';
    let datosEnviar = JSON.stringify(objeto);
    console.log(datosEnviar);
    return this._http.post(url,datosEnviar,this.httpOptions);
  }

  deleteCarritoData<T>(id:string){
    let url = 'https://api-rest-articulos.herokuapp.com/api/articulos/carrito/';
    url+=id;
    return this._http.delete(url);
  }

  /*Metodos Ventas*/

  getVentaData<T>(url: string){
    url = 'https://api-rest-articulos.herokuapp.com/api/articulos/venta'
    return this._http.get<T[]>(url)
  }

  putVentaData<T>(id:string,objeto:Object){
    let url = 'https://api-rest-articulos.herokuapp.com/api/articulos/venta/';
    url+=id;
    console.log(url);
    let datosEnviar = JSON.stringify(objeto);
    console.log(datosEnviar);
    return this._http.put(url,datosEnviar,this.httpOptions);
  }


  postVentaData<T>(objeto:Object){
    let url = 'https://api-rest-articulos.herokuapp.com/api/articulos/venta';
    let datosEnviar = JSON.stringify(objeto);
    console.log(datosEnviar);
    return this._http.post(url,datosEnviar,this.httpOptions);
  }

  deleteVentaData<T>(id:string){
    let url = 'https://api-rest-articulos.herokuapp.com/api/articulos/venta/';
    url+=id;
    return this._http.delete(url);
  }

}