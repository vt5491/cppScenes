import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';
import {VRScene} from '../vrscene/vrscene';
import {VRSceneProvider} from '../vrscene/vrscene';
import {VRRenderer} from '../vrrenderer/vrrenderer'
import {Base} from '../base/base'
import {Utils} from '../utils/utils'
import Mesh = THREE.Mesh;
import {VRRuntime} from '../vrruntime/vrruntime'

@Injectable()
export class CylinderProjection implements VRRuntime {

  camera : THREE.PerspectiveCamera;
  scene : THREE.Scene;
  renderer: THREE.Renderer;
  cube : Mesh = Utils.getBasicCube();
  cubeQuat : THREE.Quaternion = Utils.getBasicQuat()
  // controls: (<any>window)THREE.OrbitControls;
  controls: any;
  lightShadowMapViewer: any;

  constructor(public vrScene: VRScene, public vrRenderer: VRRenderer) {
    this.camera = this.vrScene.camera;
    this.camera.position.z += 5.0;
    this.scene = this.vrScene.scene;
    this.renderer = this.vrRenderer.renderer;
  }

  init() {
    console.log('CylinderProjection.init: entered')

    var material;
    var planeGeo = new THREE.PlaneBufferGeometry( 100.1, 100.1 );

    this.scene.add(new THREE.AmbientLight(0x666666));
    // Add the orbit controls
    // this.controls = new (THREE as any).OrbitControls(this.camera, this.vrRenderer.renderer.domElement);
    // this.controls.target = new THREE.Vector3(0, 100, 0);
    // this.camera.position.z = -50

    // this.camera.rotateY(Base.ONE_D555EG * 180.0)

    var geometry = new THREE.PlaneGeometry( 130, 80, 64 );
    // Note: you must use MeshPhongMaterial.  MeshBasicMaterial does not support shadows.
    //var groundMaterial = new THREE.MeshBasicMaterial( {color: 0x80ff00, side: THREE.DoubleSide} );
    var groundMaterial = new THREE.MeshPhongMaterial( {color: 0x80ff00, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, groundMaterial );
    plane.rotateX(Base.ONE_DEG * 90.0)
    plane.castShadow = false;
    plane.receiveShadow = true;
    this.scene.add( plane );

    // add in a basic rotating cube
    // this.scene.add(this.cube)

    //var cylGeometry = new THREE.CylinderGeometry( 10, 10, 50, 32 );
    var cylGeometry = new THREE.CylinderGeometry( 5,5,15, 32 );
    //var cylMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var cylMaterial = new THREE.MeshPhongMaterial( {color: 0xff80ff} );
    var cylinder = new THREE.Mesh( cylGeometry, cylMaterial );
    //cylinder.position
    //cylinder.position.y = 15.0;
    cylinder.position.x = -15.0;
    //cylinder.rotateZ(Base.ONE_DEG * 90.0)
    cylinder.rotateX(Base.ONE_DEG * 90.0)
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    this.scene.add( cylinder );

    // var dirLight = new THREE.DirectionalLight(0x00ff00, 1);
    var angle = Math.PI * 0.25;
    var intensity = 1;
    var dirLight = new THREE.SpotLight(0xff6633, intensity, 0, angle, 1);
    // light.position.set( fromX, fromY, fromZ );
    // light.target.position.set( toX, toY, toZ );
    // dirLight.position.set(100, 100, 50);
    dirLight.position.set(100, 0, 100);
    dirLight.target.position.set(0, 0, 0)
    dirLight.castShadow = true;
    dirLight.shadow = new (THREE as any).LightShadow( new THREE.PerspectiveCamera( 50, 1, 1200, 2500 ) );
    dirLight.shadow.bias = 0.0001;
    var SHADOW_MAP_WIDTH = 2048
    var SHADOW_MAP_HEIGHT = 1024
    dirLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    dirLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    // dirLight.shadowCameraVisible = true;
    // dirLight.position.set(-3, 1, 5);
    this.scene.add(dirLight);
    this.scene.add(new THREE.CameraHelper(dirLight.shadow.camera));

    this.lightShadowMapViewer = new (THREE as any).ShadowMapViewer( dirLight );
    this.lightShadowMapViewer.position.x = 10;
    this.lightShadowMapViewer.position.y = window.innerHeight - ( SHADOW_MAP_HEIGHT / 4 ) - 10;
    this.lightShadowMapViewer.size.width = window.innerWidth / 4;
    this.lightShadowMapViewer.size.height = SHADOW_MAP_HEIGHT / 4;
    this.lightShadowMapViewer.update();

    // tweak renderer for shadows
    var renderer = this.vrRenderer.renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // put a little box there where light is so we can mark it
    geometry = new THREE.BoxGeometry(2, 64, 2 )
    material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x555555, shininess: 30 });
    //material = new THREE.MeshPhongMaterial(){ color: 0xff3300, shininess: 30 };
    var cube = new THREE.Mesh(geometry, material)
    cube.castShadow = true;
    cube.receiveShadow = true;
    this.scene.add(cube)

    // put a cube to project onto
    geometry = new THREE.BoxGeometry(5, 5, 5)
    material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x555555, shininess: 30 });
    //material = new THREE.MeshPhongMaterial(){ color: 0xff3300, shininess: 30 };
    var cube2 = new THREE.Mesh(geometry, material)
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    cube2.position.x = -5

    // put a sphere to project onto
    var sphereGeometry = new THREE.SphereBufferGeometry(5.0,32)
    material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x555555, shininess: 30 });
    var sphere = new THREE.Mesh(sphereGeometry, material)
    sphere.castShadow = true
    sphere.receiveShadow = true;
    sphere.position.x = -10;
    this.scene.add(sphere)

    // add axes diagrams
    // this.scene.add(Utils.buildAxes)
    var axes = Utils.buildAxes(200)
    this.scene.add(axes)

    //add light from another script
    var light;

    light = new THREE.DirectionalLight(0xdfebff, 1.75);
    light.position.set(300, 400, 50);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;
    light.shadowCameraVisible = true;

    light.shadowMapWidth = 512;
    light.shadowMapHeight = 512;

    var d = 200;

    light.shadowCameraLeft = -d;
    light.shadowCameraRight = d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;

    light.shadowCameraFar = 1000;
    light.shadowDarkness = 0.2;

    this.scene.add(light);
    this.scene.add(new THREE.CameraHelper(light.shadow.camera));
  }

  mainLoop () {
    window.requestAnimationFrame(CylinderProjection.prototype.mainLoop.bind(this));

    //this.cube.quaternion.multiply(this.cubeQuat);
    this.vrScene.vrControls.update();
    // this.controls.update()

    this.vrScene.webVrManager.render(this.scene, this.camera)

    this.lightShadowMapViewer.render( this.renderer );
  }

  }
