import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'polialfaLab';
  // Definición de las variables
  txt: string = "HOLA MUNDO"; // texto a cifrar
  seqStr = "C1C2C2C1C2"; // secuencia ingresada a cifrar
  C1: number = 5; // claves para mover el ABCdario
  C2: number = 19;
  code: boolean = true; // Si es verdadero se cifra, sino se descifra
  abc: string = "ABCDEFGHIJKLMNÑOPQRSTUVWYZ"

  newSequence() : number[]{
    // Crea arreglo con la secuencia numérica
    var seqArr = this.seqStr.split('C'); // Esto quita todas las C's y deja un arreglo de sólo caracteres
    var seqNum = [];
    for (let i = 0; i < seqArr.length; i++) {
      seqNum[i] = +seqArr[i]; // Esto pasa los caracteres a numeros
    }
    seqNum.splice(0, 1);
    return seqNum;
  }

  moveArrayK(K:number) : string[]{
    var arrABC = this.abc.split('');
    var arr: string[] = []; // Crea arreglo vacío
    
    for (let i = K; i < arrABC.length; i++) {
      arr.push(arrABC[i]); // Llena arreglo con ABC, empezando por la K posición
    }
    for (let i = 0; i < K; i++) {
      arr.push(arrABC[i]); // Y luego llena los otros valores
    }
    return arr;
  }

  newMap() : number[]{
    
  }

  Cifrar() : string{
    var ltr = this.txt.split('');
    var seq : number[] = this.newSequence();
    var mapC1: MapType = {};
    var mapC2: MapType = {};

    // Separa el texto ingresado por caracteres en un arreglo
  
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
    console.log(str);
  
    return str;
  }

  Func() : type[]{
    // return seqNum;
  }
}


// Crear mapas que asocian "A" -> "H"
type MapType = { [id: string]: string; }

const mapC1: MapType = {};
const mapC2: MapType = {};
mapC1[" "]= "X";
mapC2[" "]= "X";

for (let i = 0; i < arrABC.length; i++) {
  mapC1[arrABC[i]] = arrC1[i]; // Crea un diccioanrio/mapa que asocia los valores del abecedario al nuevo abecedario de C1
} // ej mapC1["A"]=H
for (let i = 0; i < arrABC.length; i++) {
  mapC2[arrABC[i]] = arrC2[i];
}

// Función para cifrar el texto
codeTxt(txt, seqNum, mapC1, mapC2);
function codeTxt(txt: string, seq: number[], mapC1: MapType, mapC2: MapType) {
  var ltr = txt.split('');
  // Separa el texto ingresado por caracteres en un arreglo

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
  console.log(str);

  //return codedSentence;
}

// Función para descifrar el texto
decodeTxt(txt, seqNum, mapC1, mapC2);
function decodeTxt(txt: string, seq: number[], mapC1: MapType, mapC2: MapType) {

}
