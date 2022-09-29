import { Component } from '@angular/core';
import { refCount } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'polialfaLab';
}

// Definición de las variables
// Sentence to code
let sentence : string = "HELLO WORLD";
// Sequence to code with
let seq : string = "C1C2C1C1";
// Keys to code
let C1 : number = 5;
let C2 : number = 19;
// If true then code, false decode
let code : boolean = true;
let alphabet : string = "ABCDEFGHIJKLMNÑOPQRSTUVWYZ"
var arr : string[] = alphabet.split(String.fromCharCode(65+C1));
var arrc1 = arr[1].concat(arr[0].toString());
console.log(arrc1);
var ltr = sentence.split('');

var arr : string[] = alphabet.split(String.fromCharCode(65+C2));
var arrc2 = arr[1].concat(arr[0].toString());
console.log(arrc2);
var ltr = sentence.split('');

codeSentence(alphabet, sentence,seq,C1,C2);
function codeSentence(abc:string, sentence:string, seq:string, C1:number, C2:number) {
  var ltr = sentence.split('');
  var i:any; 
  for(i in ltr) {
    var num = ltr[i].charCodeAt(0); //convert letter character to it's ASCII code
    console.log(num);
    num = num + C1;
    ltr[i] = String.fromCharCode(num);
    console.log(ltr[i]);
  }
  var str = ltr.join();
  console.log(str);

  //return codedSentence;
}