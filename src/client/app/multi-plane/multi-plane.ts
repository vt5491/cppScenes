import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';
import PlaneBufferGeometry = THREE.PlaneBufferGeometry;
import Mesh = THREE.Mesh;
//import Object3D = THREE.Object3D;

@Component({
  selector: 'multi-plane',
  templateUrl: 'app//multi-plane/multi-plane.html',
  styleUrls: ['app//multi-plane/multi-plane.css'],
  providers: [],
  directives: [],
  pipes: []
})

@Injectable()
//export class MultiPlane extends Object3D {
export class MultiPlane {

  plane : Mesh
  geometry : PlaneBufferGeometry;

  constructor() {
        //  plane = new THREE.Mesh(
        //   new THREE.PlaneBufferGeometry( gridSize, gridSize ),
        //   new THREE.MeshBasicMaterial({map: groundTexture}) );
        //
    //this.plane = new THREE.Mesh(, material?: THREE.Material new THREE.PlaneBufferGeometry(4, 4)
    //)
    this.plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(44,344),
      new THREE.MeshBasicMaterial()
    );
    // var geometry = new THREE.PlaneGeometry( 65, 40, 32 );
    // super()
    // this.geometry = new THREE.PlaneBufferGeometry( 5, 5);
  }
}
