import {Injectable} from 'angular2/core';
import {VRScene} from '../vrscene/vrscene';
import {VRRenderer} from '../vrrenderer/vrrenderer'
import {Base} from '../base/base'
import Mesh = THREE.Mesh;

@Injectable()
export class SphereScene extends VRScene{
  sphere : Mesh

  constructor(width, height, vrRenderer) {
    super(width, height, vrRenderer)
  }

  init(width: number, height: number, vrRenderer: VRRenderer) {
    console.log('CubeOnPlaneScene.init: entered')
    console.log('CubeOnPlaneScene.init: about to call super.init')
    // super.init(width, height, vrRenderer)
    var geometry = new THREE.PlaneGeometry( 65, 40, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0x3e4a9a, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Base.ONE_DEG * 90.0)
    //super.scene.add( plane );
    this.scene.add( plane );

    var geometry2 = new THREE.SphereGeometry(35, 32, 32);
    //geometry2.position = (5, 0, 0)
    var meshParms2 = new Object();

    meshParms2['color'] = 0x269c1b;

    var material2 = new THREE.MeshBasicMaterial(meshParms2);
    this.sphere = new THREE.Mesh(geometry2, material2);
    //this.cube2.position = new THREE.Vector3(5, 0, 0)
    this.scene.add(this.sphere);

    vrRenderer.renderer.render(this.scene, this.camera);
  }
}
