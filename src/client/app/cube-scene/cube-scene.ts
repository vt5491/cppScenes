import {Component} from 'angular2/core';
import WebGLRenderer = THREE.WebGLRenderer;
import Vector3 = THREE.Vector3;
import Object3D = THREE.Object3D;
//vt-x add hello
//import {THREE} from 'three'
//import Quaternion = THREE.Quaternion;
//vt-x end
import Scene = THREE.Scene;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Mesh = THREE.Mesh;
import VRControls = THREE.VRControls;
import VREffect = THREE.VREffect;
import {Base} from '../base/base';
import {CameraKeypressEvents} from '../camera-keypress-events/camera-keypress-events'
import {VRScene} from '../vrscene/vrscene';
import {VRSceneProvider} from '../vrscene/vrscene';
import {Injectable} from 'angular2/core';

@Component({
  selector: 'cube-scene',
  templateUrl: './app/cube-scene/cube-scene.html',
  //templateUrl: './app/cpp-scenes.html',

  styleUrls: ['app//cube-scene/cube-scene.css'],
  providers: [VRSceneProvider],
  //directives: [],
  directives: [CameraKeypressEvents],
  pipes: []
})

@Injectable()
export class CubeScene {
  private canvas: HTMLElement;
  private renderer: WebGLRenderer;
  private width: number;
  private height: number;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private dolly: Object3D;
  //private controls: TrackballControls;
  private vrControls: VRControls;
  private vrEffect: VREffect;
  //private webVrManager: WebVRManager;
  private webVrManager;
  private sphere: Mesh;
  private cube: Mesh;
  private BaseRotation = new THREE.Quaternion();
  //private BaseRotation = new Quaternion();

  //private scene: Scene;
  //private base = new Base()
  private cubeQuat = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), Base.ONE_DEG * 0.2 );
  // private vrScene: VRScene;

  constructor() {
  // constructor(private vrScene: VRScene) {
    // this.vrScene = vrScene;
  };

  initWebGl() {
    console.log('initWebGl: window.width=' + window.innerWidth)
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    try {
      this.canvas = document.getElementById('scene-view');
      console.log('initWebGl: this.canvas=' + this.canvas)

      var glParms = new Object();

      glParms['antialias'] = true;
      glParms['canvas'] = this.canvas;

      this.renderer = new THREE.WebGLRenderer(glParms);
    }
    catch (e) {
      alert('This application needs WebGL enabled! error=' + e);
      return false;
    }

    // this controls the ambient background color e.g of the the "sky"
    this.renderer.setClearColor(0xf31313, 1.0);

    this.renderer.setSize(this.width, this.height);

    //this.renderer.r
    //this.container = document.getElementById('canvas-container');
    this.canvas.focus();
  }

  initScene() {
    this.scene = new THREE.Scene;


    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height);
    this.camera.position.set(0, 1.5, 100);
    this.dolly = new THREE.Object3D();
    this.dolly.position.z = 50;
    this.scene.add(this.dolly);

    this.dolly.add(this.camera);

    this.vrControls = new THREE.VRControls(this.camera);

    this.vrEffect = new THREE.VREffect(this.renderer);
    this.vrEffect.setSize(this.width, this.height);
    this.webVrManager = new (<any>window).WebVRManager(this.renderer, this.vrEffect);
    console.log('vtClass.initScene: this.webVrManager=' + this.webVrManager);
    this.camera.quaternion.copy(this.BaseRotation);

    var geometry = new THREE.BoxGeometry(25, 25, 25);
    var meshParms = new Object();

    //meshParms['color'] = 0xffff00;
    meshParms['color'] = 0xff8000;

    //var material = new THREE.MeshNormalMaterial(meshParms);
    var material = new THREE.MeshBasicMaterial(meshParms);
    //material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // draw!
    this.renderer.render(this.scene, this.camera);
    //window.requestAnimationFrame(this.mainLoop);
    //window.requestAnimationFrame(vtClass.prototype.mainLoop);

  }

  mainLoop() {
    window.requestAnimationFrame(CubeScene.prototype.mainLoop.bind(this));

    this.cube.quaternion.multiply(this.cubeQuat);

    this.vrControls.update();

    this.webVrManager.render(this.scene, this.camera);
  }

  canvasKeyHandler (event) {
    console.log('cube-scene.canvasKeyHandler: event.keyCode=' + event.keyCode);

    CameraKeypressEvents.keyHandler(event, this.dolly)
  }

}
