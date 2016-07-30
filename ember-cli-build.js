/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

      //'models/torus.fbx'
module.exports = function(defaults) {
  var app = new Angular2App(defaults, {
    vendorNpmFiles: [
      'three/build/three.js',
      'three/examples/js/controls/VRControls.js',
      'three/examples/js/effects/VREffect.js',
      'three/examples/js/Mirror.js',
      'three/examples/js/loaders/FBXLoader.js',
      'webvr-boilerplate/build/webvr-manager.js',
      'models/torus_3js.json',
      'three/examples/js/controls/OrbitControls.js',
      'three/examples/js/utils/ShadowMapViewer.js',
      'three/examples/js/shaders/UnpackDepthRGBAShader.js'
    ]
  });
  //app.import('models/torus.fbx');
  return app.toTree();
};
