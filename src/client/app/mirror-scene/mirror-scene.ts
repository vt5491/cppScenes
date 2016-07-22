import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';
import {VRScene} from '../vrscene/vrscene';
import {VRSceneProvider} from '../vrscene/vrscene';
import {VRRenderer} from '../vrrenderer/vrrenderer'
import {Base} from '../base/base'
import Mesh = THREE.Mesh;
// import Mirror = THREE.Mirror;
// import VREffect = THREE.VREffect;

@Component({
  selector: 'mirror-scene',
  templateUrl: 'app//mirror-scene/mirror-scene.html',
  styleUrls: ['app//mirror-scene/mirror-scene.css'],
  providers: [],
  directives: [],
  pipes: []
})

@Injectable()
export class MirrorScene {

  cube : Mesh;
  constructor(private vrScene: VRScene, private vrRenderer: VRRenderer) {
    // super(window.innerWidth, window.innerHeight, vrRenderer)
    //  console.log('CubeOnPlane.ctor: entered, vrRenderer=' + vrRenderer)
  }

  init(width: number, height: number) {
    console.log('MirrorScene.init: entered')
    var geometry = new THREE.PlaneGeometry( 65, 40, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Base.ONE_DEG * 90.0)
    //super.scene.add( plane );
    this.vrScene.scene.add( plane );

    var vtTmpVRRenderer = new THREE.VREffect(this.vrRenderer.renderer)
    var vtTmpabc = THREE.ShaderLib['mirror']
    // var tmpDef = THREE.Mirror()
    // var verticalMirror = new Mirror( renderer, camera, { clipBias: -1.003, textureWidth: WIDTH, textureHeight: HEIGHT, color:0x889999 } );
    var verticalMirror = new THREE.Mirror(
    // var verticalMirror = new tmpDef()
      this.vrRenderer.renderer,
      this.vrScene.camera, {
        clipBias: -1.003,
        textureWidth: this.vrRenderer.renderer.getSize().width,
        textureHeight: this.vrRenderer.renderer.getSize().height,
        color:0x889999 } );

    var verticalMirrorMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 60, 60 )
    , verticalMirror.material );
    verticalMirrorMesh.add( verticalMirror );
    verticalMirrorMesh.position.y = 35;
    verticalMirrorMesh.position.z = -45;
    this.vrScene.scene.add( verticalMirrorMesh );

    var geometry2 : THREE.BoxGeometry = new THREE.BoxGeometry(35, 25, 25);
    var meshParms = new Object();
    var material = new THREE.MeshBasicMaterial(meshParms);
    this.cube = new THREE.Mesh(geometry2, material);
    this.vrScene.scene.add(this.cube);
  }

  mainLoop () {
    window.requestAnimationFrame(MirrorScene.prototype.mainLoop.bind(this));

    this.cube.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), Base.ONE_DEG * 0.2 ) );

    this.vrScene.vrControls.update();
    this.vrScene.webVrManager.render(this.vrScene.scene, this.vrScene.camera)
  }
}
