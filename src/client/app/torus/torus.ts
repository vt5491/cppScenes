import {Injectable} from 'angular2/core';
import {VRRuntime} from '../vrruntime/vrruntime'
import {VRScene} from '../vrscene/vrscene';
//import {VRSceneProvider} from '../vrscene/vrscene'; 
import {VRRenderer} from '../vrrenderer/vrrenderer'
import Mirror = THREE.Mirror;
import {Base} from '../base/base'
import {Http, HTTP_PROVIDERS} from 'angular2/http';
//import FBXLoader = THREE.FBXLoader; 
//import FBXLoader = THREE.FBXLoader; 
//import FBXLoader = (THREE as any).FBXLoader;
import 'rxjs/Rx';

@Injectable()
export class Torus implements VRRuntime {

  cube : THREE.Mesh;
  private cubeQuat = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), Base.ONE_DEG * 0.2 );
  torusData;
  
  constructor(public vrScene: VRScene, public vrRenderer: VRRenderer, private http: Http) {
    var scene = this.vrScene.scene;
    // http.get('vendor/models/torus_3js.json')
    //   .map(res => res.json())
    //   //.subscribe(data => this.torusData = data,
    //   .subscribe(res => this.torusData = res,
    //              err => console.log(err),
    //              () => {
    //                console.log('Torus.ctor: Completed,this.torusData=' + this.torusData);
    //                var mesh = new THREE.Mesh(this.torusData);
    //                this.vrScene.scene.add(mesh);
    //              }
    //    );
    var loader = new THREE.JSONLoader();
    // loader.load('vendor/models/torus_3js.json', function(geometry) {
    loader.load('vendor/models/torus_3js.json', (geometry) => {
        var mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xbb80bb} ) );
        //var mesh = new THREE.Mesh(geometry);
        mesh.position.y = 0;
        mesh.position.x = 0;
        mesh.scale.set( 100, 100, 100 );
      
        //scene.add(mesh);
        this.vrScene.scene.add(mesh);
    });

    var ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    
    // var scene = this.vrScene.scene
    // var mixers = [];

    // // model
    // var manager = new THREE.LoadingManager();
    // manager.onProgress = function( item, loaded, total ) {

    //   console.log( item, loaded, total );

    // };

    // var onProgress = function( xhr ) {

    //   if ( xhr.lengthComputable ) {

    //     var percentComplete = xhr.loaded / xhr.total * 100;
    //     //console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
    //     console.log( Math.round( percentComplete) + '% downloaded' );

    //   }

    // };

    // var onError = function( xhr ) {
    // };

    // //var loader = new THREE.FBXLoader( manager );
    // var loader = new (THREE as any)FBXLoader( manager );
    // loader.load( 'vendor/models/torus.fbx', function( object ) {

    //   object.traverse( function( child ) {

    //     if ( child instanceof THREE.Mesh ) {

    //       // pass

    //     }

    //     // if ( child instanceof THREE.SkinnedMesh ) {

    //     //   if ( child.geometry.animations !== undefined || child.geometry.morphAnimations !== undefined ) {

    //     //     child.mixer = new THREE.AnimationMixer( child );
    //     //     mixers.push( child.mixer );

    //     //     var action = child.mixer.clipAction( child.geometry.animations[ 0 ] );
    //     //     action.play();

    //     //   }

    //     // }

    //   } );

    //   scene.add( object );


    // }, onProgress, onError );
    //this.init()
  }

  init() {
    var mesh = null;
    var scene = this.vrScene.scene

    // function initMesh() {
    //   var loader = new THREE.JSONLoader();

    //   loader.load('vendors/models/torus_3js.json', function(geometry) {
    //     mesh = new THREE.Mesh(geometry);
    //     scene.add(mesh);
    //     console.log("Torus.initMesh: mesh has been added to scene")
    //   });
    // }

    var boxGeo : THREE.BoxGeometry = new THREE.BoxGeometry(35, 25, 40);

    var meshParms = {color: 0x6080ff}
    var material = new THREE.MeshBasicMaterial(meshParms);
    this.cube = new THREE.Mesh(boxGeo, material);
    this.vrScene.scene.add(this.cube);
  }

  mainLoop () {
    window.requestAnimationFrame(Torus.prototype.mainLoop.bind(this));

    this.cube.quaternion.multiply(this.cubeQuat);

    this.vrScene.webVrManager.render(this.vrScene.scene, this.vrScene.camera)
  }
    

}
