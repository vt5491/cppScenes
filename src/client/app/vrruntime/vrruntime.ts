import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';
import WebGLRenderer = THREE.WebGLRenderer;
import {VRRenderer} from '../vrrenderer/vrrenderer'
import {VRScene} from '../vrscene/vrscene'
import {VRSceneProvider} from '../vrscene/vrscene'
// import {CubeOnPlaneScene} from '../cube-on-plane-scene/cube-on-plane-scene';
import {SphereScene} from '../sphere-scene/sphere-scene';
import {VtDummy} from '../vt-dummy/vt-dummy'

@Component({
  selector: 'vrruntime',
  templateUrl: 'app//vrruntime/vrruntime.html',
  styleUrls: ['app//vrruntime/vrruntime.css'],
  //providers: [VRRenderer, VRScene, CubeOnPlaneScene, SphereScene, VtDummy],
  providers: [VRRenderer, VRSceneProvider,
    // CubeOnPlaneScene,
    SphereScene, VtDummy],
  directives: [],
  pipes: []
})

@Injectable()
export class VRRuntime {
  width : number
  height : number
  vrRenderer: VRRenderer;
  canvas: HTMLElement;
  vrScene: VRScene;
  //vrSceneProvider: VRSceneProvider;
  // cubeOnPlaneScene: CubeOnPlaneScene;
  sphereScene: SphereScene;
  vtDummy: VtDummy;

  constructor(
    //vrRenderer: VRRenderer,
      //vrScene: VRScene
    //vrSceneProvider: VRSceneProvider,
      // cubeOnPlaneScene: CubeOnPlaneScene
//      sphereScene: SphereScene,
      //vtDummy: VtDummy
    ) {
    //this.vrRenderer = vrRenderer
//    this.vrScene = vrScene
//    this.cubeOnPlaneScene = cubeOnPlaneScene;
    //this.sphereScene = sphereScene;
    //this.vtDummy = vtDummy;
  }

  init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    //this.vtDummy.init()
    //this.vrRenderer.init(this.width, this.height);
    //this.sphereScene.init(this.width, this.height, this.vrRenderer)
    // this.cubeOnPlaneScene = new CubeOnPlaneScene(this.vrRenderer, this.vtDummy)
    // this.cubeOnPlaneScene.init(this.width, this.height, this.vrRenderer)
    // this.cubeOnPlaneScene.mainLoop()
  };

  instanceDoIt() {
    return 7;
  }
}
