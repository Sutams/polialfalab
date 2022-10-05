import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

type MapType = { [id: string]: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Definición de variables
  title = 'polialfaLab';
  
  txt: string = ""; // texto de entrada
  txtOut : string = ""; // texto salida
  seqStr = ""; // secuencia a ingresar
  C1: number = 5; // claves para mover el ABCdario
  C2: number = 19;
  cifrar: boolean = true; // Si es verdadero se cifra, sino se descifra
  abc: string = "ABCDEFGHIJKLMNÑOPQRSTUVWYZ"
  
  cambiarCifrar(){
    this.txt = "";
    this.txtOut = "";
    if(this.cifrar){
      this.cifrar = false;
    }
    else{
      this.cifrar = true;
    }    
  }

  aumentarC1(){
    if(this.seqStr.length < 12){
      this.seqStr = this.seqStr + "C1";
    }
  }
  
  aumentarC2(){
    if(this.seqStr.length < 12){
      this.seqStr = this.seqStr + "C2";
    }
  }

  newSequence() : number[]{
    // Crea arreglo con la secuencia numérica
    var seqArr = this.seqStr.split('C'); // Esto quita todas las C's y deja un arreglo de sólo caracteres
    var seqNum = [];
    for (let i = 0; i < seqArr.length; i++) {
      seqNum[i] = +seqArr[i]; // Esto pasa los caracteres a numeros
    }
    seqNum.splice(0, 1); // Se saca el primer valor, que está indefinido
    return seqNum;
  }

  moveArrayK(K:number) : string[]{ // Mueve el arreglo ABC en K veces a la izquierda
    var arrABC = this.abc.split(''); // Separa arreglo en cada letra
    var arr: string[] = []; // Crea arreglo vacío
    
    for (let i = arrABC.length-K; i < arrABC.length; i++) {
      arr.push(arrABC[i]); // Llena arreglo con ABC, empezando por la K posición
    }
    for (let i = 0; i < arrABC.length-K; i++) {
      arr.push(arrABC[i]); // Y luego llena los otros valores
    }
    return arr;
  }

  newMap(K:number) : MapType{
    var arrABC = this.abc.split('');
    var arrK = this.moveArrayK(K);
    var mapK: MapType = {};

    if (this.cifrar) {
      mapK[" "]= "X";
      for (let i = 0; i < arrABC.length; i++) {
        mapK[arrABC[i]] = arrK[i]; // Crea mapa de arrABC -> arrK
      }  
    }
    else{
      mapK["X"]= " ";
      for (let i = 0; i < arrABC.length; i++) {
        mapK[arrK[i]] = arrABC[i]; // Crea mapa de arrK -> arrABC
      }
    }
    
    return mapK;
  }

  algoritmoPolialfa() {
    if(this.C1>1 && this.C1<26){
      if(this.C2>1 && this.C2<26){
        if(this.seqStr.length >=4){
          var ltr = this.txt.split('');
          var seq : number[] = this.newSequence();
          var mapC1: MapType = this.newMap(this.C1);
          var mapC2: MapType = this.newMap(this.C2);    
          for (let i in ltr) {
            var j = +i%seq.length;
            // esto es para llevar la cuenta de en que parte de la secuencia va C1C1C2C2C1
            // dependiendo de la secuencia entra al if o al else
            // y reemplaza el texto por el correspondiente
            if (seq[j] == 1) {
              ltr[i] = mapC1[ltr[i]];
            }
            else{
              ltr[i] = mapC2[ltr[i]];
            }
          }
          var str = ltr.join('');
          this.txtOut = str;
        }
      }
    }
  }
}

