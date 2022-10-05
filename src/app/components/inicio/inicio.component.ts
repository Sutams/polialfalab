import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  modo: string;
  constructor() {

    this.modo = "cifrar"
   }

  ngOnInit(): void {
  }
  cambiarDecifrar(){
    this.modo ="decifrar"
  }
  cambiarCifrar(){
    this.modo ="cifrar"
  }
}
