import { Component } from '@angular/core';

// Definición de Tipo que relaciona una letra base a otra letra
// Ej: A -> D, cuando K=3
type Polialfabetico = { [LetraBase: string]: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'polialfaLab';
  // Definición de variables a utilizar
  txt = "";       // texto de entrada
  txtOut = "";    // texto de salida
  seqStr = "";    // secuencia ingresada Ej: C1C2C2C1
  C1 = 5;         // claves K para mover el abecedario
  C2 = 19;
  cifrar = true;  // si es verdadero se cifra, sino se descifra
  abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ" // abecedario a utilizar

  // Función para cambiar de cifrado a descifrado
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

  // Función para agregar C1 a la secuencia en html
  aumentarC1(){
    if(this.seqStr.length < 12){
      this.seqStr = this.seqStr + "C1";
    }
  }
  // Función para agregar C2 a la secuencia en html
  aumentarC2(){
    if(this.seqStr.length < 12){
      this.seqStr = this.seqStr + "C2";
    }
  }

  // Función para transformar la secuencia a una cadena numerica 
  // EJ:  C1C2C2C1 --> [1,2,2,1]
  newSequence() : number[]{
    var seqArr = this.seqStr.split('C'); // Se quitan las C's y deja un arreglo de sólo caracteres  EJ: [?,'1','2','2','1']
    var seqNum = [];
    for (let i = 0; i < seqArr.length; i++) {
      seqNum[i] = +seqArr[i];         // Se pasa los caracteres a numeros   EJ: ['','1','2','2','1'] --> [?,1,2,2,1]
    }
    seqNum.splice(0, 1);              // Se saca el primer valor, que está indefinido
    return seqNum;
  }

  // Función para mover el arreglo ABC en K veces a la izquierda
  moveArrayK(K:number) : string[]{
    var arrABC = this.abc.split('');  // Se separa arreglo en cada caracter  EJ: "HOLA" --> ['H','O','L','A']
    var arr: string[] = [];           // Crea arreglo vacío

    for (let i = K; i < arrABC.length; i++) {
      arr.push(arrABC[i]);            // Se llena arreglo vacío con el arreglo ABC, empezando por la K posición
    }
    for (let i = 0; i < K; i++) {
      arr.push(arrABC[i]);            // Se llenan las letras restantes
    }
    return arr;
  }

  // Función para crear un mapa que asocia una letra del alfabeto a otra
  newMap(K:number) : Polialfabetico{
    var arrABC = this.abc.split('');  // Se separa arreglo en cada caracter  EJ: "HOLA" --> ['H','O','L','A']
    var arrK = this.moveArrayK(K);    // Se crea el arreglo movido por K
    var mapK: Polialfabetico = {};

    if (this.cifrar) {                // Dependiendo si se debe cifrar o descifrar, invierte los arreglos a asociar
      for (let i = 0; i < arrABC.length; i++) {
        mapK[arrABC[i]] = arrK[i];    // Se llena el mapa de arrABC -> arrK
      }
    }
    else{
      for (let i = 0; i < arrABC.length; i++) {
        mapK[arrK[i]] = arrABC[i];    // Se llena el mapa de arrK -> arrABC
      }
    }
    return mapK;
  }

  // Función que reemplaza los valores del texto ingresado, según los mapas polialfabeticos creados
  algoritmoPolialfa() {
    if(this.C1>1 && this.C1<26){            // Se verifican las restricciones de valor para las claves
      if(this.C2>1 && this.C2<26){          //
        if(this.seqStr.length >=4){         // Se verifica la restriccion de tamaño de la secuencia
          var ltr = this.txt.split('');
          var seq : number[] = this.newSequence();
          var mapC1: Polialfabetico = this.newMap(this.C1);
          var mapC2: Polialfabetico = this.newMap(this.C2);

          for (let i in ltr) {
            var j = +i%seq.length;              // Se lleva la cuenta del lugar de la secuencia para no salir del límite del arreglo            
            if (this.cifrar && ltr[i] == " "){  // Se reemplaza el espacio por una X en caso de cifrar
              ltr[i] = "X";                     
            }

            if (seq[j] == 1) {          // Se ingresa o no dependiendo de la secuencia
              ltr[i] = mapC1[ltr[i]];   // y reemplaza el texto por el correspondiente
            }
            else{
              ltr[i] = mapC2[ltr[i]];
            }

            if(!this.cifrar && ltr[i] == "X"){  // Se reemplaza la X por un espacio en caso de descifrar
              ltr[i] = " ";
            }
          }
          var str = ltr.join('');
          this.txtOut = str;
        }
      }
    }
  }
}

