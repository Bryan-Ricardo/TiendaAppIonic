import { Component, OnInit } from '@angular/core';
import { GetApiService } from 'src/app/services/get-api.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  nombre: string= '';
  precio: number = 0;
  cantidad: number = 0;
  img: string = ''; 

  constructor(public _services: GetApiService) {

  }

  ngOnInit() {
      
  }
  
}