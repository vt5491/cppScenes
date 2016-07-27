import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';
import {VRScene} from '../vrscene/vrscene';
import {VRSceneProvider} from '../vrscene/vrscene';
import {VRRenderer} from '../vrrenderer/vrrenderer'
import {Base} from '../base/base'
import Mesh = THREE.Mesh;
import {VRRuntime} from '../vrruntime/vrruntime'
import Mirror = THREE.Mirror;
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
export class MirrorScene implements VRRuntime{

  cube : Mesh;
  verticalMirror : Mirror
  // private cubeQuaternion : (new THREE.Quaternion()).setFromAxisAngle( new THREE.Vector3(0,1,0))
  private cubeQuat = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), Base.ONE_DEG * 0.2 );
  // constructor(private vrScene: VRScene, private vrRenderer: VRRenderer) {
  constructor(public vrScene: VRScene, public vrRenderer: VRRenderer) {
    // super(window.innerWidth, window.innerHeight, vrRenderer)
    //  console.log('CubeOnPlane.ctor: entered, vrRenderer=' + vrRenderer)
  }

  // init(width: number, height: number) {
  init() {
    console.log('MirrorScene.init: entered')
    var planeGeo = new THREE.PlaneBufferGeometry( 100.1, 100.1 );

    this.vrScene.camera.position.z = -50
    this.vrScene.camera.rotateY(Base.ONE_DEG * 180.0)
    var scene = this.vrScene.scene
    var geometry = new THREE.PlaneGeometry( 65, 40, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0x80ff00, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Base.ONE_DEG * 90.0)
    //super.scene.add( plane );
    this.vrScene.scene.add( plane );

    // var vtTmpVRRenderer = new THREE.VREffect(this.vrRenderer.renderer)
    // var vtTmpabc = THREE.ShaderLib['mirror']
    // var tmpDef = THREE.Mirror()
    // var verticalMirror = new Mirror( renderer, camera, { clipBias: -1.003, textureWidth: WIDTH, textureHeight: HEIGHT, color:0x889999 } );
    this.verticalMirror = new THREE.Mirror(
      this.vrRenderer.renderer,
      this.vrScene.camera, {
        clipBias: -1.003,
        textureWidth: this.vrRenderer.renderer.getSize().width,
        textureHeight: this.vrRenderer.renderer.getSize().height,
        color:0x889999 } );

    var verticalMirrorMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( 60, 90 )
    , this.verticalMirror.material );
    verticalMirrorMesh.add( this.verticalMirror );
    verticalMirrorMesh.position.y = 15;
    verticalMirrorMesh.position.z = 45;
    verticalMirrorMesh.rotateY(Base.ONE_DEG * 180.0)
    this.vrScene.scene.add( verticalMirrorMesh );

    //var geometry2 : THREE.BoxGeometry = new THREE.BoxGeometry(35, 25, 25);
    var geometry2 : THREE.BoxGeometry = new THREE.BoxGeometry(35, 25, 40);
    // var meshParms = new Object();
    var meshParms = {color: 0x6080ff}
    var material = new THREE.MeshBasicMaterial(meshParms);
    this.cube = new THREE.Mesh(geometry2, material);
    this.vrScene.scene.add(this.cube);

    var planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x7f7fff } ) );
    planeFront.position.z = 50;
    planeFront.position.y = 50;
    planeFront.rotateY( Math.PI );
    scene.add( planeFront );

    // lights
    var mainLight = new THREE.PointLight( 0xcccccc, 1.5, 250 );
    mainLight.position.y = 60;
    this.vrScene.scene.add( mainLight );
  }

  mainLoop () {
    window.requestAnimationFrame(MirrorScene.prototype.mainLoop.bind(this));

    // this.cube.quaternion.multiply(cubeQuat, Base.ONE_DEG * 0.2 );
    this.cube.quaternion.multiply(this.cubeQuat);

    this.vrScene.vrControls.update();
    this.verticalMirror.render()
    this.vrScene.webVrManager.render(this.vrScene.scene, this.vrScene.camera)
  }
}
