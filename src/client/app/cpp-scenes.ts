import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {CliRouteConfig} from './route-config';
import {CubeScene} from './cube-scene/cube-scene';
import {CameraKeypressEvents} from './camera-keypress-events/camera-keypress-events'
import {VRRenderer} from './vrrenderer/vrrenderer'
import {VRScene} from './vrscene/vrscene'
import {VRSceneProvider} from './vrscene/vrscene'
// import {CubeOnPlaneScene} from './cube-on-plane-scene/cube-on-plane-scene';
// import {SphereScene} from './sphere-scene/sphere-scene';
import {VRRuntime} from './vrruntime/vrruntime'
import {VtDummy} from './vt-dummy/vt-dummy'

@Component({
  selector: 'cpp-scenes-app',
  //providers: [ROUTER_PROVIDERS, VRRuntime, VRRenderer,
//    VRScene, CubeOnPlaneScene, SphereScene, VtDummy],
  providers: [ROUTER_PROVIDERS, VRRuntime, VRRenderer,
    VRSceneProvider,
    // CubeOnPlaneScene,
    // SphereScene,
    //VRScene,
    VtDummy],
  //templateUrl: 'app/cpp-scenes.html',
  templateUrl: './app/cpp-scenes.html',
  directives: [ROUTER_DIRECTIVES, CameraKeypressEvents, VRScene,
    // CubeOnPlaneScene
  ],
  pipes: [],
  //outputs: ['cubeScene']
})

@RouteConfig([

].concat(CliRouteConfig))

export class CppScenesApp {
  defaultMeaning: number = 42;
  cubeScene : CubeScene
  //vrRenderer: VRRenderer
  //vrScene: VRScene
  vrRuntime: VRRuntime
  hideSpan1: boolean = false
  vtDummy: VtDummy
  vrRenderer: VRRenderer
  vrScene: VRScene

  //constructor(vrRenderer: VRRenderer, vrScene: VRScene) {
  constructor(vrRuntime: VRRuntime, vtDummy: VtDummy) {
  // constructor(vrRenderer: VRRenderer,
  //     vrScene: VRScene,
  //     cubeOnPlaneScene: CubeOnPlaneScene,
  //     sphereScene: SphereScene,
  //     vtDummy: VtDummy) {

    console.log('cpp-scenes: now in ctor')
    this.cubeScene = new CubeScene()

    //this.vrRenderer = vrRenderer;
    //this.vrScene = vrScene;
    //this.vrRuntime = vrRuntime;
    this.vrRuntime = vrRuntime;
    // get a custom VRScene.  We can't rely on DI because we don't know
    // certain things until run time (after injection time)
    var width = window.innerWidth;
    var height = window.innerHeight;
    // this.vrScene.init(width, height, vrRenderer)
    // this.vrRuntime = new VRRuntime(this.vrRenderer,
    //   this.vrScene, cubeOnPlaneScene, sphereScene, vtDummy)

    this.vtDummy = vtDummy
  }

  onCanvasInitClick(input, $event) {
    console.log('cpp-scenes: now in onCanvasInitClick')
    //this.cubeScene = new CubeScene()

    this.cubeScene.initWebGl()
    this.cubeScene.initScene()
    this.cubeScene.mainLoop();
  }

  canvasKeyHandler (event) {
    console.log('cpp-scenes.canvasKeyHandler: event.keyCode=' + event.keyCode);

     this.cubeScene.canvasKeyHandler(event)
  }


  onVRRuntimeInitClick(input, $event) {
      console.log('cpp-scenes: now in onVRRuntimeInitClick')
      this.hideSpan1 = true
      this.vrRuntime.init()
  }

  meaningOfLife(meaning?: number) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }

  // hideDiv1(){
  //   return true;
  // }
}
