import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  nombre:string = this.activatedRoute.snapshot.paramMap.get("nombre");
  img: string;
  cantidad: number = parseInt( this.activatedRoute.snapshot.paramMap.get("cantidad"));
  precio:number = parseInt(this.activatedRoute.snapshot.paramMap.get("precio"));
  id:string = this.activatedRoute.snapshot.paramMap.get("id");

  url = 'https://api-rest-articulos.herokuapp.com/api/articulos/imagen/';

  data= [
    {
      texto: 'Cantidad',
      contenido: this.cantidad
    },
    {
      texto: 'Precio',
      contenido: this.precio 
    }
  ]

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nombre = this.activatedRoute.snapshot.paramMap.get("nombre");
    console.log(this.nombre);
    this.img = this.activatedRoute.snapshot.paramMap.get("img");
    console.log(this.img);
    this.cantidad = parseInt( this.activatedRoute.snapshot.paramMap.get("cantidad"));
    console.log(this.cantidad);
    this.precio = parseInt(this.activatedRoute.snapshot.paramMap.get("precio"));
    console.log(this.precio);
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id)
  }

}
