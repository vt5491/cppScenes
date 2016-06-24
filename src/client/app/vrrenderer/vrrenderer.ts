import {Injectable} from 'angular2/core';
import WebGLRenderer = THREE.WebGLRenderer;

@Injectable()
export class VRRenderer {

  renderer : WebGLRenderer
  canvas: HTMLElement;

  constructor() {}

  init(width: number, height: number) {
    console.log('VRRenderer.init: entered')
    try {
      //this.canvas = document.getElementById('vrruntime-view');
      // this.canvas = document.getElementById('scene-div');
      this.canvas = document.getElementById('scene-view');
      console.log('initWebGl: this.canvas=' + this.canvas)

      var glParms = new Object();

      glParms['antialias'] = true;
      glParms['canvas'] = this.canvas;

      //console.log('init: this.vrRenderer=' + this.vrRenderer)
      this.renderer = new THREE.WebGLRenderer(glParms);
      console.log('init: this.renderer=' + this.renderer)

    }
    catch (e) {
      alert('This application needs WebGL enabled! error=' + e);
      return false;
    }

    // this controls the ambient background color e.g of the the "sky"
    //this.renderer.setClearColor(0xf31313, 1.0);
    this.renderer.setClearColor(0x13f313, 1.0);

    this.renderer.setSize(width, height);

  }

}
