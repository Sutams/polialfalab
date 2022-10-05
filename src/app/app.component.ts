import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'polialfaLab';
}

// Definición de las variables
let txt: string = "HOLA MUNDO"; // texto a cifrar
let seqStr = "C1C2C2C1C2"; // secuencia ingresada a cifrar
let C1: number = 10; // claves para mover el ABCdario
let C2: number = 19;
let code: boolean = true; // Si es verdadero se cifra, sino se descifra
let abc: string = "ABCDEFGHIJKLMNÑOPQRSTUVWYZ"

// Crea arreglo con la secuencia numérica
var seqArr = seqStr.split('C');
var seqNum = [];
for (let i = 0; i < seqArr.length; i++) {
  seqNum[i] = +seqArr[i];
}
seqNum.splice(0, 1);

// Crear arreglos desplazados en C1 y C2
var arrABC = abc.split('');
var arrC1: string[] = [];
var arrC2: string[] = [];

for (let i = arrABC.length-C1; i >= 0; i--) {
  arrC1.push(arrABC[i]);
}
for (let i = arrABC.length-1; i > arrABC.length-C2; i--) {
  arrC1.push(arrABC[i]);
}

for (let i = arrABC.length-C1; i >= 0; i--) {
  arrC2.push(arrABC[i]);
}
for (let i = arrABC.length-1; i > arrABC.length-C2; i--) {
  arrC2.push(arrABC[i]);
}

// Crear mapas
type MapType = { [id: string]: string; }

const mapC1: MapType = {};
const mapC2: MapType = {};
mapC1[" "]= "X";
mapC2[" "]= "X";

for (let i = 0; i < arrABC.length; i++) {
  mapC1[arrABC[i]] = arrC1[i];  
}
for (let i = 0; i < arrABC.length; i++) {
  mapC2[arrABC[i]] = arrC2[i];
}

// Función para cifrar el texto
codeTxt(txt, seqNum, mapC1, mapC2);
function codeTxt(txt: string, seq: number[], mapC1: MapType, mapC2: MapType) {
  var ltr = txt.split('');

  for (let i in ltr) {
    var j = +i%seq.length;

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
codeTxt(txt, seqNum, mapC1, mapC2);
function decodeTxt(txt: string, seq: number[], mapC1: MapType, mapC2: MapType) {
  var ltr = txt.split('');

  for (let i in ltr) {
    var j = +i%seq.length;

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
