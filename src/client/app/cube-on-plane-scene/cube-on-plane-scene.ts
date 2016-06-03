import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';
import {VRScene} from '../vrscene/vrscene';
import {VRSceneProvider} from '../vrscene/vrscene';
import {VRRenderer} from '../vrrenderer/vrrenderer'
import {Base} from '../base/base'
import {CameraKeypressEvents} from '../camera-keypress-events/camera-keypress-events'
import Mesh = THREE.Mesh;
import {VtDummy} from '../vt-dummy/vt-dummy'

@Component ({
  selector: 'cube-on-plane-scene',
  templateUrl: 'app//cube-on-plane-scene/cube-on-plane-scene.html',
  //providers: [VRScene]
  providers: [VRSceneProvider]
})

@Injectable()
// export class CubeOnPlaneScene extends VRScene{
export class CubeOnPlaneScene {
  cube2: Mesh
  private cubeQuat = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), Base.ONE_DEG * 0.2 );
  childDummy: THREE.Vector3 = new THREE.Vector3();
  vtDummy: VtDummy;

  //constructor(vtDummy: VtDummy) {
  // constructor(vrRenderer: VRRenderer, vtDummy: VtDummy) {
  constructor(private vrScene: VRScene, private vrRenderer: VRRenderer, vtDummy: VtDummy) {
    // super(window.innerWidth, window.innerHeight, vrRenderer)
    // console.log('CubeOnPlane.ctor: entered, vrRenderer=' + vrRenderer)
    this.vtDummy = vtDummy
  }

  // init(width: number, height: number, vrRenderer: VRRenderer) {
  init(width: number, height: number) {
    console.log('CubeOnPlaneScene.init: entered')
    console.log('CubeOnPlaneScene.init: about to call super.init')
    //super.init(width, height, vrRenderer)
    var geometry = new THREE.PlaneGeometry( 65, 40, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Base.ONE_DEG * 90.0)
    //super.scene.add( plane );
    this.vrScene.scene.add( plane );

    var geometry2 = new THREE.BoxGeometry(35, 25, 25);
    //geometry2.position = (5, 0, 0)
    var meshParms2 = new Object();

    meshParms2['color'] = 0x8080ff;

    var material2 = new THREE.MeshBasicMaterial(meshParms2);
    this.cube2 = new THREE.Mesh(geometry2, material2);
    //this.cube2.position = new THREE.Vector3(5, 0, 0)
    this.vrScene.scene.add(this.cube2);

    // this.dummy.x = 17.0
    //TODO: I think I can remove this
    this.vrRenderer.renderer.render(this.vrScene.scene, this.vrScene.camera);
  }

  canvasKeyHandler (event) {
    console.log('cube-on-plane-scene.canvasKeyHandler: event.keyCode=' + event.keyCode);
    //console.log('vrscene.canvasKeyHandler: this.dolly' + this.dolly);
    //console.log('vrscene.canvasKeyHandler: self.dolly' + this.dolly);
    //console.log('cube-on-plane-scene.canvasKeyHandler: super' + super);
    // console.log('cube-on-plane-scene.canvasKeyHandler: this' + this);
    // console.log('cube-on-plane-scene.canvasKeyHandler: this.BaseRotation' + this.BaseRotation);
    // console.log('cube-on-plane-scene.canvasKeyHandler: this.dolly' + this.dolly);
    //
    // CameraKeypressEvents.keyHandler(event, this.dolly)
    //CameraKeypressEvents.keyHandler(event, VRScene.prototype.canvasKeyHandler)
    //CameraKeypressEvents.keyHandler(event, dolly)
  }

  mainLoop () {
    //window.requestAnimationFrame(this.scene.prototype.mainLoop.bind(this));
    window.requestAnimationFrame(CubeOnPlaneScene.prototype.mainLoop.bind(this));

    this.cube2.quaternion.multiply(this.cubeQuat);

    this.vrScene.vrControls.update();

    this.vrScene.webVrManager.render(this.vrScene.scene, this.vrScene.camera);
  }

}
