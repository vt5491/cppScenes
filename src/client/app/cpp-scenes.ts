import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {CliRouteConfig} from './route-config';
import {CubeScene} from './cube-scene/cube-scene';
import {CameraKeypressEvents} from './camera-keypress-events/camera-keypress-events'
import {VRRenderer} from './vrrenderer/vrrenderer'
import {VRScene} from './vrscene/vrscene'
import {VRSceneProvider} from './vrscene/vrscene'
import {Injector} from 'angular2/core';
import {CubeOnPlaneScene} from './cube-on-plane-scene/cube-on-plane-scene';
import {MirrorScene} from './mirror-scene/mirror-scene';
import {Torus} from './torus/torus';
import {CylinderProjection} from './cylinder-projection/cylinder-projection';
// import {SphereScene} from './sphere-scene/sphere-scene';
// import {VRRuntime} from './vrruntime/vrruntime'
import {VtDummy} from './vt-dummy/vt-dummy'
import {Utils} from './utils/utils'
import {VRRuntime} from './vrruntime/vrruntime'

@Component({
  selector: 'cpp-scenes-app',
  providers: [ROUTER_PROVIDERS,
        //      Http,
    // VRRuntime,
    VRRenderer,
    VRSceneProvider,
    // CubeOnPlaneScene,
    // SphereScene,
    //VRScene,
    //VRSceneProvider,
    VtDummy, Utils],
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
  // vrRuntime: VRRuntime
  hideSpan1: boolean = false
  vtDummy: VtDummy
  //vrRenderer: VRRenderer
  // vrScene: VRScene
  //vRSceneProvider: VRSceneProvider;
  vrScene: VRScene
  cubeOnPlaneScene: CubeOnPlaneScene
  vrRuntime: VRRuntime

  model
  flipMovement: boolean
  //constructor(vrRenderer: VRRenderer, vrScene: VRScene) {
  // constructor(vrRuntime: VRRuntime, vtDummy: VtDummy,
  constructor(vtDummy: VtDummy,
    private injector: Injector, public vrRenderer: VRRenderer,
              private utils: Utils, private http: Http ) {

    console.log('cpp-scenes: now in ctor')
    this.cubeScene = new CubeScene()

    //this.vrRenderer = vrRenderer;
    //this.vrScene = vrScene;
    //this.vrRuntime = vrRuntime;
    // this.vrRuntime = vrRuntime;
    // get a custom VRScene.  We can't rely on DI because we don't know
    // certain things until run time (after injection time)
    var width = window.innerWidth;
    var height = window.innerHeight;
    // this.vrScene.init(width, height, vrRenderer)
    // this.vrRuntime = new VRRuntime(this.vrRenderer,
    //   this.vrScene, cubeOnPlaneScene, sphereScene, vtDummy)

    this.vtDummy = vtDummy

    this.model = {
      // scene:  "cube-on-plane-scene"
      //scene:  "mirror-scene"
      //scene:  "torus"
      scene:  "cylinder-projection"
    };
  }

  // This works, but I'm converting to cube-on-plane-scene
  // onCanvasInitClick(input, $event) {
  //   console.log('cpp-scenes: now in onCanvasInitClick')
  //   //this.cubeScene = new CubeScene()
  //   // Note: we have to init vrScene here, not in ctor because the html DOM
  //   // structure isn't set up properly until we are here.
  //   this.vrScene = this.injector.get(VRScene)
  //
  //   this.cubeScene.initWebGl()
  //   this.cubeScene.initScene()
  //   this.cubeScene.mainLoop();
  // }

  onCanvasInitClick(input, $event) {
    console.log('cpp-scenes: now in onCanvasInitClick ')
    console.log('cpp-scenes: model.scene=' + this.model.scene)
    // Note: we have to init vrScene here, not in ctor because the html DOM
    // structure isn't set up properly until we are here.
    //give keyboard focus back to the canvasKeyHandler
    document.getElementById('scene-view').focus();

    this.vrScene = this.injector.get(VRScene)

    switch (this.model.scene)
    {
      case 'cube-on-plane-scene' :
        // this.cubeOnPlaneScene = new CubeOnPlaneScene(this.vrScene, this.vrRenderer, this.vtDummy)
        //
        // this.cubeOnPlaneScene.init(10,10)
        // this.cubeOnPlaneScene.mainLoop()
        this.vrRuntime = new CubeOnPlaneScene(this.vrScene, this.vrRenderer)

        // this.vrRuntime.init()
        // this.vrRuntime.mainLoop()
        // this.flipMovement = false
      break;
      case 'mirror-scene' :
        console.log('now kicking off mirror-scene')
        // var mirrorScene = new MirrorScene(this.vrScene, this.vrRenderer)
        //
        // // mirrorScene.init(10,10)
        // mirrorScene.init()
        // mirrorScene.mainLoop()
        this.vrRuntime = new MirrorScene(this.vrScene, this.vrRenderer)

        // this.vrRuntime.init()
        // this.vrRuntime.mainLoop()
        // this.flipMovement = false
      break;
      case 'torus' :
        console.log('now kicking off torus')
        this.vrRuntime = new Torus(this.vrScene, this.vrRenderer, this.http)
        //this.vrRuntime = new Torus()

        // this.vrRuntime.init()
        // this.vrRuntime.mainLoop()
        // this.flipMovement = false
      break;
      case 'cylinder-projection' :
        this.vrRuntime = new CylinderProjection(this.vrScene, this.vrRenderer)
      break;
      default :
        console.log('invalid switch selection');
    }

    this.vrRuntime.init()
    this.vrRuntime.mainLoop()
  }

  canvasKeyHandler (event) {
    // console.log('cpp-scenes.canvasKeyHandler: event.keyCode=' + event.keyCode);

     //this.cubeScene.canvasKeyHandler(event)
    //  this.cubeOnPlaneScene.canvasKeyHandler(event)
    CameraKeypressEvents.keyHandler(event, this.vrRuntime.vrScene.dolly, this.flipMovement)
  }


  onVRRuntimeInitClick(input, $event) {
      console.log('cpp-scenes: now in onVRRuntimeInitClick')
      this.hideSpan1 = true
      // this.vrRuntime.init()
  }

  meaningOfLife(meaning?: number) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }

  onResize(event) {
    console.log('cpp-scenes.onResize: event=' + event)
    var camera = this.vrRuntime.vrScene.camera;
    var renderer = this.vrRuntime.vrRenderer.renderer

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  // hideDiv1(){
  //   return true;
  // }
}
