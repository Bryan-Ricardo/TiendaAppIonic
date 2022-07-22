import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.page.html',
  styleUrls: ['./ver.page.scss'],
})
export class VerPage implements OnInit {

  nombre:string = this.activatedRoute.snapshot.paramMap.get("nombre");
  img: string;
  cantidad: string = this.activatedRoute.snapshot.paramMap.get("cantidad");;
  precio:string = this.activatedRoute.snapshot.paramMap.get("precio");

  data= [
    {
      texto: 'Nombre',
      contenido: this.nombre
    },
    {
      texto: 'Cantidad',
      contenido: this.cantidad
    },
    {
      texto: 'Precio',
      contenido: this.precio
    }
  ]

  url = 'https://api-rest-articulos.herokuapp.com/api/articulos/imagen/';


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nombre = this.activatedRoute.snapshot.paramMap.get("nombre");
    console.log(this.nombre);
    this.img = this.activatedRoute.snapshot.paramMap.get("img");
    console.log(this.img);
    this.cantidad = this.activatedRoute.snapshot.paramMap.get("cantidad");
    console.log(this.cantidad);
    this.precio = this.activatedRoute.snapshot.paramMap.get("precio");
    console.log(this.precio);
  }


}
