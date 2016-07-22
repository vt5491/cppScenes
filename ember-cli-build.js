/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  var app = new Angular2App(defaults, {
    vendorNpmFiles: [
      'three/build/three.js',
      'three/examples/js/controls/VRControls.js',
      'three/examples/js/effects/VREffect.js',
      'three/examples/js/Mirror.js',
      'webvr-boilerplate/build/webvr-manager.js'
    ]
  });
  return app.toTree();
};
