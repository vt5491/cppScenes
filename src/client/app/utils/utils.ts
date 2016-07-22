import {Injectable} from 'angular2/core';
// import Color = THREE.Color;

@Injectable()
export class Utils {

  constructor() {
    console.log('Utils: now it ctor')
  }

  static doIt () : number {
    return 7;
  }

  //static getRndColor () : THREE.Color {
  getRndColor () : THREE.Color {
    return new THREE.Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  }
}
